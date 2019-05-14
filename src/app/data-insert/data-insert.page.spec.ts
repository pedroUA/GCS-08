import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInsertPage } from './data-insert.page';

describe('DataInsertPage', () => {
  let component: DataInsertPage;
  let fixture: ComponentFixture<DataInsertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataInsertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataInsertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
