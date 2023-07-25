import { Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotifierComponent } from '../shared/notifier/notifier.component';
import { MessageService } from './message.service';
// import { ToastOptions } from 'projects/lib/src/types/interface.message';
// import { AlertComponent } from '../components/alert/alert.component';
// import { ConfirmComponent } from '../components/confirm/confirm.component';
// import { NotifierComponent } from '../components/notifier/notifier.component';
// import { PromptComponent } from '../components/prompt/prompt.component';

@Injectable({
  providedIn: 'root'
})
export class InitializerService {
  private hosts: string[] = [];

  constructor(
    private messageSer: MessageService,
    private injector: Injector,
  ) {}

  async initApp() {
    this.initMessageService();
  }

  /** 初始化 Message/Toast 流程 */
  private initMessageService() {
    console.log(`init toast service`);
    this.messageSer.setNotifyComponent(NotifierComponent);
    // this.messageSer.setAlertComponent(AlertComponent);
    // this.messageSer.setConfirmComponent(ConfirmComponent);
    // this.messageSer.setPromptComponent(PromptComponent);
    // this.messageSer.messageProvider = {
    //   toast: (toastOps?: ToastOptions) => {
    //     const toastrSer = this.injector.get(ToastrService);
    //     const instance = toastrSer.show(toastOps?.body, toastOps?.title, {
    //       enableHtml: toastOps?.enableHtml,
    //       positionClass: toastOps?.position,
    //       closeButton: toastOps?.closeButton,
    //       tapToDismiss: toastOps?.tapToDismiss,
    //       extendedTimeOut: toastOps?.extendedTimeOut,
    //       timeOut: toastOps?.autoDismiss,
    //       toastClass: toastOps?.toastClass,
    //     });
    //     if (instance.toastRef.componentInstance) { // angular 8
    //       instance.toastRef.componentInstance.extraParams = {
    //         icon: toastOps?.icon,
    //         link: toastOps?.link
    //       };
    //     } else if (instance.portal.instance) { // angular 9
    //       instance.portal.instance.extraParams = {
    //         icon: toastOps?.icon,
    //         link: toastOps?.link
    //       };
    //     }
    //   }
    // };
  }
}
