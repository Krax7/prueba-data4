import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinBarChartComponent } from './min-bar-chart.component';

describe('MinBarChartComponent', () => {
  let component: MinBarChartComponent;
  let fixture: ComponentFixture<MinBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
