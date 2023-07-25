import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { PartnersComponent } from './partners/partners.component';
import { ContactComponent } from './contact/contact.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RightNavComponent } from './right-nav/right-nav.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalService } from './service/modal.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { PopContactComponent } from './contact/pop-contact/pop-contact.component';
import { CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent } from './shared/card/card.component';
import { InitializerService } from './service/initializer.service';
import { CommonContactComponent } from './common-contact/common-contact.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [									
    AppComponent,
      HomeComponent,
      AboutComponent,
      SolutionsComponent,
      PartnersComponent,
      ContactComponent,
      MenuComponent,
      FooterComponent,
      RightNavComponent,
      PopContactComponent,
      CardComponent,
      CardHeaderComponent,
      CardBodyComponent,
      CardFooterComponent,
      CommonContactComponent
   ],
  imports: [
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    }),
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OverlayModule,
    // BrowserAnimationsModule,
    // ToastrModule.forRoot()
  ],
  providers: [
    { provide: ModalService },
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializerSer: InitializerService) => () => appInitializerSer.initApp(),
      deps: [InitializerService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
