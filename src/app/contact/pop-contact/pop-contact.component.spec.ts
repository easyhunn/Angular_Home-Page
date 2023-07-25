/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PopContactComponent } from './pop-contact.component';

describe('PopContactComponent', () => {
  let component: PopContactComponent;
  let fixture: ComponentFixture<PopContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
