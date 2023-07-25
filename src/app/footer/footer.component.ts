import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { MenuService } from '../service/menu.service';
import { ModalService } from '../service/modal.service';
import { TranslationsService } from '../service/translations.service';
import { filter } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isUrlPath: string = '';
  routerAssignId: number = 1;

  constructor(
    public menuSer: MenuService,
    public router: Router,
    private activeRoute: ActivatedRoute,
    public translations: TranslationsService,
    private modalSer: ModalService,
  ) {}

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((e: any) => {
      this.isUrlPath = e?.url.includes('about');
    })
    this.routerAssignId = this.activeRoute.snapshot.params['url'];
    this.move(this.routerAssignId, '')
  }

  move(pathMove: number | '', path: string) {
    const widthAll = $(window).width();
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

}
