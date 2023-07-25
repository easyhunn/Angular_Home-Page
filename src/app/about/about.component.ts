import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationsService } from '../service/translations.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { MessageService } from '../service/message.service';
import { TranslateService } from '@ngx-translate/core';
import { PopContactComponent } from '../contact/pop-contact/pop-contact.component';
import { ModalService } from '../service/modal.service';
import { MenuService } from '../service/menu.service';
declare var $: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

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

  routerAssignId: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private messageSer: MessageService,
    public translations: TranslationsService,
    private translate: TranslateService,
    private modalSer: ModalService,
    private menuSer: MenuService,
  ) { }

  ngOnInit() {
    let r = this.activeRoute.snapshot.params['id'];
    this.routerAssignId = r ? r : 0;
    this.move(this.routerAssignId)
  }

  move(pathMove: number) {
    const widthAll = $(window).width();
    if (widthAll <= 991) {
      $('html,body').animate({scrollTop: $('#' + pathMove).offset().top - 70}, 800);
    } else {
      $('html,body').animate({scrollTop: $('#' + pathMove).offset().top - 100}, 800);
    }
  }

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
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setTimeout(() => {
        this.isShowCdk = false;
      }, 1200);
    }, function(error) {
      console.log('FAILED...', error);
    });
    this.clearInput();
  }

  popPopContact() {
    this.modalSer.open(PopContactComponent, {
      hasBackdrop: true,
      width: '950px'
    }, comp => {
      // comp.test = 123
    });
  }

}
