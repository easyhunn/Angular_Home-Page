/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommonContactComponent } from './common-contact.component';

describe('CommonContactComponent', () => {
  let component: CommonContactComponent;
  let fixture: ComponentFixture<CommonContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
