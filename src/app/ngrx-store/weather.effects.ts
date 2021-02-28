import { Injectable } from '@angular/core';
import { act, Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WeatherApiService } from 'src/api/weatherApi';
import { AddWeatherFailureAction, LoadWeather, WeatherAction, WeatherActionTypes } from 'src/app/ngrx-store/actions/weather.actions';

@Injectable()
export class WeatherEffects {

  @Effect() loadWeather$ = this.actions$
    .pipe(
      ofType<WeatherAction>(WeatherActionTypes.ADD_WEATHER),
      switchMap((action) => {
        console.log("action: ", action.payload)
         return this.weatherApiService.getWeatherByCity(action.payload.weatherData)
              .pipe(
                  map(data => {
                      return new LoadWeather({weatherData: data});
                  }),
                  catchError(error => of(new AddWeatherFailureAction(error)))
              );
        }),
  );

  constructor(
    private actions$: Actions,
    private weatherApiService: WeatherApiService
  ) { }
}