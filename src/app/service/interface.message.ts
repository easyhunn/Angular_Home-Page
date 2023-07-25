import { Type } from '@angular/core';

export type notifierType = '' | 'success' | 'info' | 'error';

export interface IConfirmType {
  title?: string;
  msg: string;
  yesFunc: () => void | Promise<void>;
  noFunc?: () => void | Promise<void>;
}

export interface IDynamicModalSetting {
  title: string;
  skin?: string;
  btnAlign?: 'r' | 'l' | 'c';
  closeBtnType?: 0 | 1 | 2;
  area: {
    width: string,
    height?: string
  };
  component: Type<IDynamicComponent>;
  yesBtnName?: string;
  noBtnName?: string;
  afterCreatedFunc?: (component: object) => void;
}

export interface IDynamicComponent {
  closeModal?: () => void;
  yesBtn(): boolean | Promise<boolean>;
  noBtn(): void | Promise<void>;
  cancelBtn?(): boolean | Promise<boolean>;
}

export interface IMessage {
  toast(options?: ToastOptions): void;
}

export interface ToastOptions {
  icon?: string;
  title?: string;
  body?: string;
  link?: any;
  enableHtml?: boolean;  // 將 body 以 html 顯示
  closeButton?: boolean; // 顯示關閉按鈕
  tapToDismiss?: boolean;  // 點擊一下關閉
  extendedTimeOut?: number; // 滑鼠滑上去後, 以這個來計算離開時的關閉時間
  autoDismiss?: number;  // 數毫秒後自動關閉
  position?: 'toast-center-center'|'toast-top-center'|
    'toast-bottom-center'|'toast-top-full-width'|'toast-bottom-full-width'|
    'toast-top-left'|'toast-top-right'|'toast-bottom-right'|'toast-bottom-left';
  toastClass?: string;
}
