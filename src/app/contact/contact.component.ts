import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { ModalService } from '../service/modal.service';
import { TranslationsService } from '../service/translations.service';
// import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  routerAssignId: any;

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
    public router: Router,
    private activeRoute: ActivatedRoute,
    public translations: TranslationsService,
    // private toastr: ToastrService
  ) { }

  ngOnInit() {
    let r = this.activeRoute.snapshot.params['id'];
    this.routerAssignId = r ? r : 0;
    this.move(this.routerAssignId)
  }

  move(pathMove: number) {
    $('html,body').animate({scrollTop: $('#' + pathMove).offset().top - 100}, 800);
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

}