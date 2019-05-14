import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalProgressPage } from './personal-progress.page';

describe('PersonalProgressPage', () => {
  let component: PersonalProgressPage;
  let fixture: ComponentFixture<PersonalProgressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalProgressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
