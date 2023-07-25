import { Component } from '@angular/core';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { TranslationsService } from './service/translations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'siraya';

  constructor(
    public router: Router,
    public translations: TranslationsService,
  ) {}

  ngOnInit() {
    emailjs.init("VJblgPlsn_TBgzbGY");
    // this.router.navigate([`/home/0`]);
  }
}
