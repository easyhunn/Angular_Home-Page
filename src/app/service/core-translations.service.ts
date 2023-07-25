import { Injectable } from '@angular/core';
import lang from './language';
import { TranslationsHelper } from './helper/translations-helper';

@Injectable({
  providedIn: 'root'
})
export class CoreTranslationsService extends TranslationsHelper.GenericClass<typeof lang>() {

  constructor() {
    super();
    Object.assign(this, TranslationsHelper.transformObjectToPath('', lang));
  }

}
