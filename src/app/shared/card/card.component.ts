import { Component } from '@angular/core';

@Component({
  selector: 'app-card-header',
  styleUrls: ['./card-header.component.scss'],
  template: `<ng-content></ng-content>`
})
export class CardHeaderComponent {}

@Component({
  selector: 'app-card-body',
  styleUrls: ['./card-body.component.scss'],
  template: `<ng-content></ng-content>`
})
export class CardBodyComponent {}

@Component({
  selector: 'app-card-footer',
  styleUrls: ['./card-footer.component.scss'],
  template: `<div class="card-footer"><ng-content></ng-content></div>`
})
export class CardFooterComponent {}

@Component({
  selector: 'app-card',
  styleUrls: ['./card.component.scss'],
  template: `
    <ng-content select="app-card-header"></ng-content>
    <ng-content select="app-card-body"></ng-content>
    <ng-content></ng-content>
    <ng-content select="app-card-footer"></ng-content>
  `
})
export class CardComponent {}
