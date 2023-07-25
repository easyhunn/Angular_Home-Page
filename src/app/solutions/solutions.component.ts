import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopContactComponent } from '../contact/pop-contact/pop-contact.component';
import { MenuService } from '../service/menu.service';
import { ModalService } from '../service/modal.service';
import { TranslationsService } from '../service/translations.service';
declare var $: any;
@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss']
})
export class SolutionsComponent implements OnInit {

  routerAssignId: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    public translations: TranslationsService,
    private modalSer: ModalService,
    private menuSer: MenuService
  ) { }

  ngOnInit() {
    let r = this.activeRoute.snapshot.params['id'];
    this.routerAssignId = r ? r : 0;
    this.move(this.routerAssignId)
  }

  move(pathMove: number) {
    const widthAll = $(window).width();
    if (widthAll <= 991) {
      // this.router.navigate([`/solutions/9`]);
      // $('html,body').animate({scrollTop: 0}, 800);
      // if (Number(pathMove) === 4) {
      //   return $('html,body').animate({scrollTop: $('#' + pathMove).offset().top + 370}, 800);
      // }
      // if (Number(pathMove) === 11) {
      //   return $('html,body').animate({scrollTop: $('#' + pathMove).offset().top + 1250}, 800);
      // }
      // if (Number(pathMove) === 11 && this.menuSer.initMove) {
      //   return $('html,body').animate({scrollTop: $('#' + pathMove).offset().top + 600}, 800);
      // }
      // if (Number(pathMove) === 12) {
      //   return $('html,body').animate({scrollTop: $('#' + pathMove).offset().top + 550}, 800);
      // }
      $('html,body').animate({scrollTop: $('#' + pathMove).offset().top - 70}, 800);
    } else {
      if (Number(pathMove) === 4) {
        return $('html,body').animate({scrollTop: $('#' + pathMove).offset().top - 50}, 800);
      }
      if (Number(pathMove) === 12 || Number(pathMove) === 11) {
        return $('html,body').animate({scrollTop: $('#' + pathMove).offset().top - 30}, 800);
      }
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
