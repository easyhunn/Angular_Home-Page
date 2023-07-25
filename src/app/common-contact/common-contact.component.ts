import { Component, OnInit } from '@angular/core';
import { PopContactComponent } from '../contact/pop-contact/pop-contact.component';
import { ModalService } from '../service/modal.service';
import { TranslationsService } from '../service/translations.service';

@Component({
  selector: 'app-common-contact',
  templateUrl: './common-contact.component.html',
  styleUrls: ['./common-contact.component.scss']
})
export class CommonContactComponent implements OnInit {
  socailLogoItem = [
    {url: 'cooperation_1'},
    {url: 'cooperation_2'},
    {url: 'cooperation_3'},
    {url: 'cooperation_4'},
    {url: 'cooperation_5'},
    {url: 'cooperation_6'},
    {url: 'cooperation_7'},
    {url: 'cooperation_8'},
    {url: 'cooperation_9'},
    {url: 'cooperation_10'},
    {url: 'cooperation_11'},
    {url: 'cooperation_12'},
    {url: 'cooperation_13'},
    {url: 'cooperation_14'},
    {url: 'cooperation_15'},
    {url: 'cooperation_16'},
    {url: 'cooperation_17'},
    {url: 'cooperation_18'},
    {url: 'cooperation_19'},
    {url: 'cooperation_20'},
  ];

  constructor(
    public translations: TranslationsService,
    private modalSer: ModalService,
  ) { }

  ngOnInit() {
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
