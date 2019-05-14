import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsPage } from './graphics.page';

describe('GraphicsPage', () => {
  let component: GraphicsPage;
  let fixture: ComponentFixture<GraphicsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
