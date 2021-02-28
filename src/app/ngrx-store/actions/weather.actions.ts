import { Action } from '@ngrx/store';
// import { WeatherData } from '../models/weather-data/weather-data';

export enum WeatherActionTypes {
  LoadWeather = '[Home Page] Load Weather',  
  ADD_WEATHER = '[WEATHER] Add',
  REMOVE_WEATHER = '[WEATHER] Delete',
  WEATHER_HAS_SUCCESS = '[WEATHER] Success',
  WEATHER_HAS_FAILED = '[WEATHER] Failure',
}

export class WeatherAction implements Action {
  type: string;
  payload: {
    weatherData,
    error
  };
}

export class LoadWeather implements Action {
  readonly type = WeatherActionTypes.LoadWeather;

  constructor(readonly payload: any) 
  {

  }
}
export class AddWeatherAction implements Action {
    readonly type = WeatherActionTypes.ADD_WEATHER
  
    constructor(readonly payload: {weatherData}) {

    }
}
export class AddWeatherSuccessAction implements Action {
  readonly type = WeatherActionTypes.WEATHER_HAS_SUCCESS

  constructor(public payload: any) { }
}

export class AddWeatherFailureAction implements Action {
  readonly type = WeatherActionTypes.WEATHER_HAS_FAILED
  
  constructor(public payload: any) { }
  }
  
export class DeleteWeatherAction implements Action {
readonly type = WeatherActionTypes.REMOVE_WEATHER

constructor(public payload: any) { }
}


export type WeatherActions = 
LoadWeather |
AddWeatherAction |
AddWeatherSuccessAction |
AddWeatherFailureAction |
DeleteWeatherAction;
