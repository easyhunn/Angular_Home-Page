import { Component, OnInit } from '@angular/core';
import { ModalOverlayRef } from 'src/app/service/modal-overlay-ref';
import { TranslationsService } from 'src/app/service/translations.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { MessageService } from 'src/app/service/message.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-pop-contact',
  templateUrl: './pop-contact.component.html',
  styleUrls: ['./pop-contact.component.scss']
})

export class PopContactComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  companyName: string = '';
  phone: string = '';
  mail: string = '';
  message: string = '';

  checkFirstName: boolean = false;
  checkLastName: boolean = false;
  checkMail: boolean = false;
  checkMessage: boolean = false;

  isShowCdk: boolean = false;

  constructor(
    public overlayRef: ModalOverlayRef,
    public translations: TranslationsService,
    private messageSer: MessageService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {}

  clearInput() {
    this.firstName = '';
    this.lastName = '';
    this.companyName = '';
    this.phone = '';
    this.mail = '';
    this.message = '';
  }

  checkForm() {
    const patternMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (this.firstName === '') {
      this.checkFirstName = true;
    } else {
      this.checkFirstName = false;
    }

    if (this.lastName === '') {
      this.checkLastName = true;
    } else {
      this.checkLastName = false;
    }

    if (this.mail === '' || !(patternMail.test(this.mail))) {
      this.checkMail = true;
    } else {
      this.checkMail = false;
    }

    if (this.message === '') {
      this.checkMessage = true;
    } else {
      this.checkMessage = false;
    }
  }

  send() {
    this.checkForm();
    if (this.checkFirstName || this.checkLastName || this.checkMail || this.checkMessage) {
      return;
    }
    const input = {
      firstName: this.firstName,
      lastName: this.lastName,
      companyName: this.companyName,
      phone: this.phone,
      mail: this.mail,
      message: this.message
    }
    this.isShowCdk = true;
    emailjs.send('service_qrmcrpm', 'template_xw0f36s', input)
    .then(async (response) => {
      console.log('SUCCESS!', response.status, response.text);
      this.messageSer.notify(await this.translate.get(this.translations.contact.isSuccess).toPromise());
      this.close();
      setTimeout(() => {
        this.isShowCdk = false;
      }, 1200);
    }, function(error) {
      console.log('FAILED...', error);
    });
    this.clearInput();
  }

  close() {
    this.overlayRef.close();
  }

}
