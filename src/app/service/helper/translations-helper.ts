import { TranslateService } from '@ngx-translate/core';

export class TranslationsHelper {

  /** Convert translation Object into class type */
  public static GenericClass<Props>(): new () => Props {
    return class { } as any;
  }

  /** Convert translation object into path string */
  public static transformObjectToPath<T extends object | string>(
    suffix: string,
    objectToTransformOrEndOfPath: T,
    path = ''
  ): T {
    const prefix = this.concatIfExistsPath(path, suffix);
    return typeof objectToTransformOrEndOfPath === 'object'
      ? Object.entries(objectToTransformOrEndOfPath).reduce(
        (objectToTransform, [key, value]) => {
          (objectToTransform as any)[key] = this.transformObjectToPath(
            key, value, this.concatIfExistsPath(path, suffix)
          );
          return objectToTransform;
        }, {} as T
      )
      : prefix as T;
  }

  /** extract translation keys from object */
  public static extract(data: any, collect: string[], regexp: RegExp = /^!!(.+)/) {
    if (typeof data === 'string') {
      const r = regexp.exec(data);
      if (r) {
        collect.push(r[1]);
      }
    } else {
      for (const k in data) {
        if (data[k]) {
          this.extract(data[k], collect);
        }
      }
    }
  }

  /** fulfill/replace translations */
  public static fulfill(data: any, trans: {[k: string]: string}, regexp: RegExp = /^!!(.+)/) {
    if (typeof data === 'string') {
      return 0;
    }
    let countter = 0;
    for (const k in data) {
      if (data[k]) {
        if (typeof data[k] === 'string') {
          const r = regexp.exec(data[k]);
          if (r) {
            const tKey = r[1];
            if (trans[tKey]) {
              data[k] = trans[tKey];
              countter++;
            }
          }
        } else {
          countter += this.fulfill(data[k], trans);
        }
      }
    }
    return countter;
  }

  /** extract & fulfill */
  public static async objectDeepTranslate(translate: TranslateService, target: {}|[], regexp: RegExp = /^!!(.+)/) {
    const keys: string[] = [];
    const info = {
      extracted: 0, // 統計倍提取出來的 i18n-key
      replaced: 0 // 統計完成的翻譯數量
    };
    this.extract(target, keys, regexp);
    if (keys.length > 0) {
      info.extracted = keys.length;
      const trans = await translate.get(keys).toPromise();
      info.replaced = this.fulfill(target, trans, regexp);
    }
    return info;
  }

  private static concatIfExistsPath(path: string, suffix: string): string {
    return path ? `${path}.${suffix}` : suffix;
  }
}
