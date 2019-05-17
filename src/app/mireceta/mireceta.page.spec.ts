import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MirecetaPage } from './mireceta.page';

describe('MirecetaPage', () => {
  let component: MirecetaPage;
  let fixture: ComponentFixture<MirecetaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MirecetaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MirecetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
