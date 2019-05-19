import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRecetaPage } from './ver-receta.page';

describe('VerRecetaPage', () => {
  let component: VerRecetaPage;
  let fixture: ComponentFixture<VerRecetaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerRecetaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerRecetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
