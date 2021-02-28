import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import axios, {AxiosRequestConfig} from "axios";
import {Observable, of} from "rxjs";
// import { addWeather } from 'src/app/store/actions/weather.actions';
import {WeatherForLondon} from "src/mock-data/api-mock-data";

@Injectable()
export class WeatherApiService {
  constructor(private store: Store){}
  weatherForLondon = WeatherForLondon;
  options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    params: {
      q: '',
      lat: '0',
      lon: '0',
      id: '2172797',
      lang: 'null',
      units: 'metric',
      mode: 'xml, html'
    },
    headers: {
      'x-rapidapi-key': '4ba3d6b503mshb6a797a989ce3ddp122552jsndc772ac4ace4',
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
    }
  };

  getWeatherByCityMock(city){
    let observable$ = Observable.create( ( observer ) => {
          observer.next( this.weatherForLondon );
          observer.complete();
          // this.store.dispatch(addWeather(this.weatherForLondon));
    } );
    return observable$;
  }

  protected performGetByCity(reqOptions){
      let observable$ = Observable.create( ( observer ) => {
        axios.request(reqOptions)
          .then( ( response ) => {
            observer.next( response.data );
            observer.complete();
          } )
          .catch( ( error ) => {
            observer.error( error );
          } );
      } );
      return observable$;
    }

    getWeatherByCity(city: string){
      const getWeatherByCityOptions = this.options;
      getWeatherByCityOptions.params.q = city;

      return this.performGetByCity(getWeatherByCityOptions);
    }
 }

