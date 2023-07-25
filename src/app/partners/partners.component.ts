import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { PopContactComponent } from '../contact/pop-contact/pop-contact.component';
import { MenuService } from '../service/menu.service';
import { ModalService } from '../service/modal.service';
import { TranslationsService } from '../service/translations.service';
declare var $: any;
@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  routerAssignId: any;
  partnerList = [
    {img_url: 'assets/home_banner_1.png'},
    {img_url: 'assets/home_banner_2.png'},
    {img_url: 'assets/home_banner_1.png'},
  ];
  intervalId!: ReturnType<typeof setTimeout>;
  interval = 5000;
  currentSlide = 0;

  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    public translations: TranslationsService,
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

  popPopContact() {
    this.modalSer.open(PopContactComponent, {
      hasBackdrop: true,
      width: '950px'
    }, comp => {
      // comp.test = 123
    });
  }

}
