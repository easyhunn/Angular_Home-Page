import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PopContactComponent } from '../contact/pop-contact/pop-contact.component';
import { MenuService } from '../service/menu.service';
import { ModalService } from '../service/modal.service';
import { StorageService } from '../service/stroage.service';
import { TranslationsService } from '../service/translations.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  routerAssignId: any;

  betSoftwareUrlMobile = '';
  bannerList = [
    {title_1: 'Web', title_2: 'Performance'},
    {title_1: 'Web', title_2: 'Security'},
    {title_1: 'Data', title_2: 'Intelligence'}
  ];
  intervalId!: ReturnType<typeof setTimeout>;
  interval = 5000;
  currentSlide: number = 0;

  carouselIndex = 0;
  carouselTransition = 'top .3s ease-in';
  carouselShiftSize = 3;
  carouselTimer: any = false;

  routerEventSubscription: any;

  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private menuSer: MenuService,
    public translations: TranslationsService,
    public storageSer: StorageService,
    private modalSer: ModalService,
  ) { }

  ngOnInit() {
    let r = this.activeRoute.snapshot.params['id'];
    this.routerAssignId = r ? r : 0;
    this.routerEventSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        let r = this.activeRoute.snapshot.params['id'];
        this.routerAssignId = r ? r : 0;
        this.moveSlide(this.routerAssignId);
      }
    });
    this.move(this.routerAssignId);
    this.moveSlide(this.routerAssignId);
  }

  ngOnDestroy() {
    this.routerEventSubscription.unsubscribe();
  }

  moveSlide(slide: string) {
    let slideNumber = Number(slide);
    if (slideNumber === 3) {
      this.currentSlide = 0;
    }
    if (slideNumber === 4) {
      this.currentSlide = 1;
    }
    if (slideNumber === 5) {
      this.currentSlide = 2;
    }
  }

  move(pathMove: number) {
    const n = Number(pathMove)
    const widthAll = $(window).width();
    if (n) {
      if (widthAll <= 991) {
        $('html,body').animate({scrollTop: $('#' + pathMove).offset().top - 70}, 800);
      } else {
        $('html,body').animate({scrollTop: $('#' + pathMove).offset().top - 100}, 800);
      }
    }
  }

  moveUrl() {
    this.menuSer.initMove = false;
    this.router.navigate(['solutions/10']);
  }

  slide() {
    if (this.intervalId) {
      this.clearSlideInterval();
    }
    this.intervalId = setInterval(() => {
      if (this.currentSlide === this.bannerList.length - 1) {
        return this.currentSlide = 0;
      }
      this.currentSlide++;
      return;
    }, this.interval);
  }

  turnTo(idx: number) {
    this.clearSlideInterval();
    this.currentSlide = idx;
    this.slide();
  }

  clearSlideInterval() {
    clearInterval(this.intervalId);
  }

  createRange(n: number): number[] {
    const items: number[] = [];
    for (let i = 0; i < n; i++) {
      items.push(i);
    }
    return items;
  }

  callLanguage(lang: string) {
    this.translations.langType.lang = lang;
    this.translations.setLang(this.translations.langType.lang);
    this.storageSer.setItem('lang', JSON.stringify(this.translations.langType));
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
