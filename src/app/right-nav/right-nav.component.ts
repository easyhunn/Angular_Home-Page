import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['./right-nav.component.scss']
})
export class RightNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  move(pathMove: number) {
    $('html,body').animate({scrollTop: 0}, 800);
  }

}
