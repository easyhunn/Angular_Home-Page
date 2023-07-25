import { Injectable } from '@angular/core';
import { Base64 } from 'js-base64';
import * as localForage from 'localforage';
// import { ConfigService } from './config.service';

export enum LocalStorageKey {
  Lang = 'lang'
}

export interface SkinType {
  platform: string;
  skin: string;
}

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private inst: LocalForage;
  private rotateMap = 'SMeAyKLn8m0k14C9FPBatWhYT6OjIgGpw5UuvRNJZb2QXDosciHx7qlVEfrz3d';

  constructor(
    // public configSer: ConfigService
  ) {
    // const localStorageSetting = configSer.envConfiguration.localStorage;
    this.inst = localForage.createInstance({
      driver: localForage.LOCALSTORAGE,
      // name: localStorageSetting.groupName,
      // storeName: localStorageSetting.storeName
    });
  }

  get storage() {
    return this.inst;
  }

  async setItem(key: string, v: any) {
    const jStr = JSON.stringify(v);
    await this.inst.setItem(key, jStr);
  }

  async getItem<T>(key: string) {
    const jStr = await this.inst.getItem<string>(key);
    if (jStr) {
      return JSON.parse(jStr) as T;
    }
    return null!;
  }

  async removeItem(key: string) {
    await this.inst.removeItem(key);
  }

  /** export encrypted base64 text */
  async export(candidates?: string[]) {
    const pack: {
      [key: string]: string | number;
      __export__: number;
    } = { __export__: Date.now() };
    for (const key in LocalStorageKey) {
      if (LocalStorageKey[key as keyof typeof LocalStorageKey]) {
        const keyName: string = LocalStorageKey[key as keyof typeof LocalStorageKey];
        // 如果有指定 (candidates), 就進行過濾
        if (candidates && !candidates.includes(keyName)) {
          continue;
        }
        const value = await this.inst.getItem<string>(keyName);
        if (value) {
          pack[keyName] = value;
        }
      }
    }
    // 將資料序列化後, 進行 base64 編碼, 再進行簡易的加密
    const b64str = Base64.encode(JSON.stringify(pack));
    const ciphertext = this.rotateEncrypt(b64str);
    return ciphertext;
  }

  /** import encrypted base text */
  async import(ciphertext: string) {
    // 解密資料
    const plaintext = this.rotateEncrypt(ciphertext, false);
    try {
      const json = Base64.decode(plaintext);
      if (json) {
        const bundle = JSON.parse(json);
        if (bundle) {
          for (const k in bundle) {
            if (bundle[k]) {
              await this.inst.setItem(k, bundle[k]);
            }
          }
        }
      }
    } catch (ignore) { }
  }

  /** 對 base64 進行旋轉編碼/解碼 */
  private rotateEncrypt(b64str: string, encrypt = true) {
    const mapping = this.rotateMapping(encrypt);
    let output = '';
    for (const ch of b64str) {
      output += (mapping[ch as keyof typeof mapping] !== undefined ? mapping[ch as keyof typeof mapping] : ch);
    }
    return output;
  }

  /** 選轉邊碼表轉 mapping */
  private rotateMapping(right: boolean) {
    const len = this.rotateMap.length;
    const tmp = this.rotateMap.substr(1) + this.rotateMap.substr(0, 1);
    const map: {[key: string]: string} = {};
    for (let i = 0; i < len; i++) {
      if (right) {
        map[this.rotateMap[i]] = tmp[i];
      } else {
        map[tmp[i]] = this.rotateMap[i];
      }
    }
    return map;
  }

  /** 產生隨機旋轉編碼表 */
  private generateRotateMap() {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let output = '';
    for (let i = 0; i < charset.length; i++) {
      const rnd = Math.floor((i + 1) * Math.random());
      output = output.substr(0, rnd) + charset[i] + output.substr(rnd);
    }
    return output;
  }
}
