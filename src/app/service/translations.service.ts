import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import lang from '../../language';
import { TranslationsHelper } from './helper/translations-helper';
import { LocalStorageKey, StorageService } from './stroage.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService extends TranslationsHelper.GenericClass<any>() {
  langType = {lang: ''};

  constructor(
    private translateService: TranslateService,
    public storageSer: StorageService,
  ) {
    super();
    this.langConfigPath();
  }

  langConfigPath() {
    this.getLangStorage();
    Object.assign(this, TranslationsHelper.transformObjectToPath('', lang));
  }

  async getLangStorage() {
    this.langType = JSON.parse(await this.storageSer.getItem(LocalStorageKey.Lang));
    if (!this.langType) {
      this.langType = {lang: 'en'};
      this.setLang(this.langType.lang);
    }
    this.setLang(this.langType.lang);
  }

  setLang(lang: string) {
    this.translateService.use(lang);
  }

}
