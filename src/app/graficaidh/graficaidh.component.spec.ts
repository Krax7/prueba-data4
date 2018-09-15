import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaidhComponent } from './graficaidh.component';

describe('GraficaidhComponent', () => {
  let component: GraficaidhComponent;
  let fixture: ComponentFixture<GraficaidhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaidhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaidhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
