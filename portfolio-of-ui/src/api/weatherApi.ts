import { Injectable } from '@angular/core';
import axios, {AxiosRequestConfig} from "axios";
import {Observable, of} from "rxjs";

@Injectable()
export class WeatherApiService {
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

  mockData = {
  "coord":{
    "lon":-0.13,
    "lat":51.51
  },
  "weather":[
    {
      "id":804,
      "main":"Clouds",
      "description":"overcast clouds",
      "icon":"04d"
    }
  ],
  "base":"stations",
  "main":{
    "temp":12.5,
    "feels_like":12.58,
    "temp_min":11.67,
    "temp_max":13.33,
    "pressure":1012,
    "humidity":92
  },
  "visibility":10000,
  "wind":{
    "speed":0.45,
    "deg":281,
    "gust":2.24
  },
  "clouds":{
    "all":96
  },
  "dt":1606305277,
  "sys":{
    "type":3,
    "id":2019646,
    "country":"GB",
    "sunrise":1606289744,
    "sunset":1606319994
  },
  "timezone":0,
  "id":2643743,
  "name":"London",
  "cod":200
};

  getWeatherByCityMock(city){
    let observable$ = Observable.create( ( observer ) => {
          observer.next( this.mockData );
          observer.complete();
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

