import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDescComponent } from './weather-desc.component';

describe('WeatherDescComponent', () => {
  let component: WeatherDescComponent;
  let fixture: ComponentFixture<WeatherDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
