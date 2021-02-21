import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWeatherComponent } from './new-weather.component';

describe('NewWeatherComponent', () => {
  let component: NewWeatherComponent;
  let fixture: ComponentFixture<NewWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
