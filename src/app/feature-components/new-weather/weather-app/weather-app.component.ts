import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectWeather } from 'src/app/reducers';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss']
})
export class WeatherAppComponent implements OnInit {

  constructor(private store: Store) { }

  private weatherData$: Observable<any>;
  weatherData;
  weatherSub: Subscription;

  ngOnInit(): void {
    this.weatherData$ = this.store.select(selectWeather);
    this.weatherSub = this.weatherData$.subscribe( response => {
      if(response){
        this.weatherData = response;
      }
    });
  }

}
