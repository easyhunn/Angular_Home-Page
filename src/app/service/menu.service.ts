import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsService } from './translations.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  initMove = true;
  path: number = 0;
  // menuItem = [
  //   {
  //     id: 0, title: 'Home', show: false, tree: [
  //     {id: 1, title: 'Speedy Security', path: 'home'},
  //     {id: 2, title: 'Services For All', path: 'home'},
  //     {id: 3, title: 'Web Performance', path: 'home'},
  //     {id: 4, title: 'Web Security', path: 'home'},
  //     {id: 5, title: 'Data Intelligence', path: 'home'},
  //   ]},
  //   {
  //     id: 1, title: 'About us', show: false, tree: [
  //     {id: 6, title: 'We Are Your Guardian', path: 'about'},
  //     {id: 7, title: 'Mission & Vision', path: 'about'},
  //     {id: 8, title: 'Service for All', path: 'about'}
  //   ]},
  //   {
  //     id: 2, title: 'Solutions', show: false, tree: [
  //     {id: 9, title: 'Solutions', path: 'solutions'},
  //     {id: 10, title: 'Web Performance', path: 'solutions'},
  //     {id: 11, title: 'Web Security', path: 'solutions'},
  //     {id: 12, title: 'Data Intelligence', path: 'solutions'},
  //   ]},
  //   {
  //     id: 3, title: 'Our partners', show: false, tree: [
  //     {id: 13, title: 'Our partners', path: 'partners'},
  //     {id: 14, title: 'Our Partner Network', path: 'partners'},
  //     {id: 15, title: 'Become Our Partner', path: 'partners'}
  //   ]},
  //   {
  //     id: 4, title: 'Contact us', show: false, tree: [
  //     {id: 16, title: 'Contact us', path: 'contact'}
  //   ]},
  // ]

  constructor() {}

}
