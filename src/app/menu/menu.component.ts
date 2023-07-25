import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PopContactComponent } from '../contact/pop-contact/pop-contact.component';
import { MenuService } from '../service/menu.service';
import { ModalService } from '../service/modal.service';
import { StorageService, LocalStorageKey } from '../service/stroage.service';
import { TranslationsService } from '../service/translations.service';
declare var $: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isMenu = false; // 手機版 菜單 是否打開
  mobileInfoMenu: any; // 手機版子菜單控制
  closeMenu = false;
  isShow: number | undefined;
  isLang: string | undefined;
  langNotEn: boolean | undefined;
  langCurrent = {lang: ''};

  constructor(
    public menuSer: MenuService,
    public router: Router,
    public translations: TranslationsService,
    public storageSer: StorageService,
    private modalSer: ModalService,
  ) { }

  async ngOnInit() {
    this.langCurrent = JSON.parse(await this.storageSer.getItem(LocalStorageKey.Lang));
    this.langNotEn = this.langCurrent?.lang !== 'en' ? true : false;
  }

  toggleMenu() {
    this.isMenu = !this.isMenu;
    this.closeMenu = !this.closeMenu;
    this.mobileInfoMenu = false;
  }

  move(pathMove: number | '', path: string, device: string) {
    const widthAll = $(window).width();
    if (device === 'mobile') {
      this.closeMenu = true;
      this.isMenu = !this.isMenu;
    }
    if (pathMove === 4) {
      this.router.navigate([`/${path}/4`]);
    }
    if (pathMove === 0) {
      $('html,body').animate({scrollTop: 0}, 800);
      this.router.navigate([`/${path}/0`]);
    }
    if (path) {
      this.router.navigate([`/${path}/${pathMove}`]);
    }
    if (pathMove) {
      if (widthAll <= 991) {
        $('html,body').animate({scrollTop: $('#' + pathMove).offset().top - 70}, 800);
      } else {
        $('html,body').animate({scrollTop: $('#' + pathMove).offset().top - 100}, 800);
      }
    }
  }

  moveType(pathMove: number | '', path: string) {
    let url = window.location.pathname;
    url
    if (url && url.includes(path)) {
      $('html,body').animate({scrollTop: 0}, 800);
    }
    this.router.navigate([`/${path}/${pathMove}`]);
  }

  mobileNav(idx: number) {
    this.mobileInfoMenu = true;
    this.isShow = idx;
    // this.menuSer.menuItem.forEach(item => {
    //   if (item.id === idx) {
    //     item.show = true;
    //   } else {
    //     item.show = false;
    //   }
    // })
  }

  async callLanguage(lang: string) {
    this.translations.langType.lang = lang;
    this.translations.setLang(this.translations.langType.lang);
    this.storageSer.setItem('lang', JSON.stringify(this.translations.langType));

    // this.isMenu = !this.isMenu;
    this.closeMenu = !this.closeMenu;
    this.mobileInfoMenu = false;
    this.langCurrent = JSON.parse(await this.storageSer.getItem(LocalStorageKey.Lang));
    this.langNotEn = this.langCurrent.lang !== 'en' ? true : false;
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
