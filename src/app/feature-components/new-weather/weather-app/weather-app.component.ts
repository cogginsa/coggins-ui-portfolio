import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectWeather } from 'src/app/ngrx-store/reducers';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss']
})
export class WeatherAppComponent implements OnInit {

  constructor(private store: Store) { }

  private weatherData$: Observable<any>;
  private pathToCustomIcons: string = "assets/custom-weather-icons/";
  private svgSuffix: string = ".svg";
  private defaultImage: string = "02d" + this.svgSuffix;
  public weatherData;
  weatherSub: Subscription;

  ngOnInit(): void {
    this.weatherData$ = this.store.select(selectWeather);
    this.weatherSub = this.weatherData$.subscribe( response => {
      if(response){
        console.log("response: ", response  ) 
        this.weatherData = response;
      }
    });
  }

  getWeatherIcon(weatherIconCode: string): string{
    if(weatherIconCode){
      return this.pathToCustomIcons + weatherIconCode + this.svgSuffix;
    }
    return this.pathToCustomIcons + this.defaultImage;
  }

}
