import { Component, Injectable, Input, Type } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { ModalOverlayRef } from './modal-overlay-ref';
import { ModalService } from './modal.service';
import { ModalConfig } from './type/interfaces';
import { CoreTranslationsService } from './core-translations.service';
import { IDynamicModalSetting, IMessage, notifierType, ToastOptions } from './interface.message';
import { StorageService } from './stroage.service';
import { TranslationsHelper } from './helper/translations-helper';

declare var require: any;
declare var layui: any;

enum LocalStorageKey {
  Domain = 'domains',
  UserInfo = 'userInfo',
  MemoryGameType = 'MemoryGameType', // web 記憶玩法
  QuickAmount = 'quickAmount',
  DeviceId = 'deviceId',
  GeoipCache = 'geoipCache',
  UserSkin = 'userSkin',
  UserEditMenu = 'userEditMenu',
  UserEditRightMenuWeb = 'userEditRightMenuWeb', // web 記憶右側最愛
  MyMemoryGameTypeNewApp = 'MyMemoryGameTypeNewApp', // v2-app 收藏玩法
  MemoryNewApp = 'MemoryNewApp', // app 記憶玩法
  SavePassword = 'savePassword',
  ThemeApp = 'ThemeApp',
  SkinApp = 'SkinApp',
  MemoryBetGameTypeNewApp = 'MemoryBetGameTypeNewApp', // v2-app 投注過記憶玩法
  MyFavGameTypeNewWeb = 'MyFavGameTypeNewWeb', // web 收藏玩法
  SkipModal = 'SkipModal',
  QuickAmountKline = 'QuickAmountKline', // 涨跌竞猜筹码
  MasterLotteryMusicSwitch = 'MasterLotteryMusicSwitch', // 投注页音效 总 开 关
}

interface AlertOptions {
  title?: string;
  text: string;
  textAsHtml?: boolean; // 將 text 以 html 進行 render
  btnCloseTitle?: string; // 關閉按鈕的文字
  onClose?: () => any;
  autoDismiss?: number;
}

interface ConfirmOptions {
  title?: string;
  text: string;
  textAsHtml?: boolean; // 將 text 以 html 進行 render
  btnCloseTitle?: string; // 關閉按鈕的文字
  btnConfirmTitle?: string; // 確定按鈕的文字
  confirmModalId?: ConfirmModalId;
  onNo?: () => any;
  onYes?: () => any;
}

interface PromptOptions {
  title?: string;
  btnSubmitTitle?: string; // 提交按鈕的文字
  onSubmit: (value: string) => any;
  onCancel: () => any;
  placeHolder?: string;
  type?: string;
}

export enum ConfirmModalId {
  OneMoreBet = 1
}

// https://github.com/csilva2810/notifier
@Component({
  template: ''
})
export class ModalAlertComponent {
  @Input() title?: string;
  @Input() text?: string;
  @Input() textAsHtml?: boolean;
  @Input() btnCloseTitle?: string;
  @Input() onClose?: () => any;
  close() { }
}

@Component({
  template: ''
})
export class ModalConfirmComponent {
  @Input() title?: string;
  @Input() text?: string;
  @Input() textAsHtml?: boolean;
  @Input() btnCloseTitle?: string;
  @Input() btnConfirmTitle?: string;
  @Input() onYes?: () => any;
  @Input() onNo?: () => any;
  confirmModalId?: number;
  no() {}
  async yes() {}
}

@Component({
  template: ''
})
export class ModalNotifierComponent {
  @Input() type?: string;
  @Input() text?: string;
  constructor(
    public modalOverlayRef: ModalOverlayRef
  ) {}
}

@Component({
  template: ''
})
export class ModalPromptComponent {
  constructor(
    public overlayRef: ModalOverlayRef
  ) { }
  @Input() title?: string;
  @Input() btnSubmitTitle?: string;
  @Input() onSubmit?: (value: string) => any;
  @Input() onCancel?: () => any;
  @Input() placeHolder ? = '';
  @Input() type ? = '';
  cancel(): void {}
  submit(): void {}
}

const toastOptionsDefault: ToastOptions = {
  icon: '',
  title: '',
  body: '',
  link: '',
  enableHtml: false,
  closeButton: true,
  tapToDismiss: true,
  extendedTimeOut: 1000,
  autoDismiss: 1000,
  position: 'toast-bottom-right',
  toastClass: 'gg-toast'
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // toastElement: ons.OnsToastElement;
  toastContent = '';
  toastTimeoutSubject = new Subject();  // 控制關閉

  // notify
  // notifierComp: NotifierComponent;
  notifierComp?: ModalNotifierComponent;

  addDynamicModal$ = new Subject<IDynamicModalSetting>();
  removeDynamicModel$ = new Subject<{ elemId: string }>();

  private provider?: IMessage;

  private typeAlertComponent?: Type<ModalAlertComponent>;
  private typeConfirmComponent?: Type<ModalConfirmComponent>;
  private typeNotifyComponent?: Type<ModalNotifierComponent>;
  private typePromptComponent?: Type<ModalPromptComponent>;

  constructor(
    private modalSer: ModalService,
    private storageSer: StorageService,
    private translate: TranslateService,
    private translations: CoreTranslationsService,
  ) {
    console.log('message service init.');
  }

  set messageProvider(p: IMessage) {
    this.provider = p;
  }

  setAlertComponent(component: Type<ModalAlertComponent>): void {
    this.typeAlertComponent = component;
  }

  setConfirmComponent(component: Type<ModalConfirmComponent>): void {
    this.typeConfirmComponent = component;
  }

  setNotifyComponent(component: Type<ModalNotifierComponent>): void {
    this.typeNotifyComponent = component;
  }

  setPromptComponent(component: Type<ModalPromptComponent>): void {
    this.typePromptComponent = component;
  }

  async notify(text: string | { type: notifierType, text: string }, timeout: number = 2000, status = '') {
    const msg = typeof(text) === 'string' ? text : text.text;
    status = typeof(text) === 'string' ? status : text.type;

    if (!msg || typeof(msg) !== 'string') {
      console.warn('incorrect notify message type');
      return;
    }
    if (this.notifierComp) {
      this.notifierComp.modalOverlayRef.close();
    }
    // const alertOpts = {...alertOptionsDefault, ...options};
    const comp = this.modalSer.open(this.typeNotifyComponent!,
      { hasBackdrop: false, disposeOnNavigation: false },
      c => {
        c.type = status;
        c.text = msg;
      }
    );
    this.notifierComp = comp;
    setTimeout(() => {
      comp.modalOverlayRef.close();
    }, timeout);
    // this.notifierComp.next(comp);
  }

  // async alert(options: AlertOptions) {

  //   const alertOptionsDefault: AlertOptions = {
  //     title: `!!${this.translations.CoreModule.messageSer.defaultTitle}`,  // 温馨提示
  //     text: '',
  //     textAsHtml: false,
  //     btnCloseTitle: `!!${this.translations.CoreModule.messageSer.defaultCloseBtn}`,  // 关闭
  //     onClose: () => {}
  //   };
  //   await TranslationsHelper.objectDeepTranslate(this.translate, alertOptionsDefault);

  //   const alertOpts = {...alertOptionsDefault, ...options};
  //   this.modalSer.open(this.typeAlertComponent!, {} , c => {
  //     c.title = alertOpts.title;
  //     c.text = alertOpts.text;
  //     c.textAsHtml = alertOpts.textAsHtml;
  //     c.btnCloseTitle = alertOpts.btnCloseTitle;
  //     c.onClose = alertOpts.onClose;
  //     if (alertOpts.autoDismiss) {
  //       setTimeout(() => {
  //         c.close();
  //       }, alertOpts.autoDismiss);
  //     }
  //   });
  // }

  // async confirm(options: ConfirmOptions, modalConfig: ModalConfig = { width: 300, maxHeight: 500 }) {
  //   if (options.confirmModalId) {
  //     const key = `${LocalStorageKey.SkipModal}_${options.confirmModalId}`;
  //     const skipModal = await this.storageSer.getItem<boolean>(key);
  //     if (skipModal) {
  //       return options.onYes && options.onYes();
  //     }
  //   }

  //   const confirmOptionsDefault: ConfirmOptions = {
  //     title: `!!${this.translations.CoreModule.messageSer.defaultTitle}`, // 温馨提示
  //     text: '',
  //     textAsHtml: false,
  //     btnCloseTitle: `!!${this.translations.CoreModule.messageSer.defaultCloseBtn}`, // 关闭
  //     btnConfirmTitle: `!!${this.translations.CoreModule.messageSer.defaultConfirmBtn}`, // 确定
  //     confirmModalId: 0,
  //     onYes: () => {},
  //     onNo: () => {},
  //   };
  //   await TranslationsHelper.objectDeepTranslate(this.translate, confirmOptionsDefault);

  //   const confirmOpts = {...confirmOptionsDefault, ...options};
  //   this.modalSer.open(this.typeConfirmComponent!, modalConfig , c => {
  //     c.title = confirmOpts.title;
  //     c.text = confirmOpts.text;
  //     c.textAsHtml = confirmOpts.textAsHtml;
  //     c.btnCloseTitle = confirmOpts.btnCloseTitle;
  //     c.btnConfirmTitle = confirmOpts.btnConfirmTitle;
  //     c.confirmModalId = confirmOpts.confirmModalId;
  //     c.onYes = confirmOpts.onYes;
  //     c.onNo = confirmOpts.onNo;
  //   });
  // }

  // async prompt(options: PromptOptions) {

  //   const promptOptionsDefault: PromptOptions = {
  //     title: `!!${this.translations.CoreModule.messageSer.defaultTitle}`,
  //     btnSubmitTitle: `!!${this.translations.CoreModule.messageSer.defaultSubmitBtn}`, // 提交
  //     placeHolder: '',
  //     type: options.type,
  //     onSubmit: (v: string) => {},
  //     onCancel: () => {},
  //   };
  //   await TranslationsHelper.objectDeepTranslate(this.translate, promptOptionsDefault);

  //   const promptOpts = {...promptOptionsDefault, ...options};
  //   this.modalSer.open(this.typePromptComponent!, {
  //   } , c => {
  //     c.title = promptOpts.title;
  //     c.btnSubmitTitle = promptOpts.btnSubmitTitle;
  //     c.onSubmit = promptOpts.onSubmit;
  //     c.onCancel = promptOpts.onCancel;
  //     c.type = promptOpts.type,
  //     c.placeHolder = promptOpts.placeHolder;
  //   });
  // }

  // toast(options?: ToastOptions) {
  //   if (this.provider && this.provider.toast) {
  //     const toastOps = {...toastOptionsDefault, ...options};
  //     this.provider.toast(toastOps);
  //   }
  // }
}

