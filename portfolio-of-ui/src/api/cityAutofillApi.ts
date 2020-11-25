import axios, {AxiosRequestConfig} from "axios";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

@Injectable()
export class CityAutofillApiService {
  options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
    params: {limit: '7', minPopulation: '1000', namePrefix: '', sort: '-population', types: "CITY", includeDeleted: "none"},
    headers: {
      'x-rapidapi-key': '4ba3d6b503mshb6a797a989ce3ddp122552jsndc772ac4ace4',
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }
  };


  mockData = {
    "coord": {
      "lon": -0.13,
      "lat": 51.51
    },
    "weather": [
      {
        "id": 501,
        "main": "Rain",
        "description": "moderate rain",
        "icon": "10n"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 286.31,
      "feels_like": 284.83,
      "temp_min": 285.37,
      "temp_max": 287.15,
      "pressure": 1020,
      "humidity": 87
    },
    "visibility": 10000,
    "wind": {
      "speed": 2.6,
      "deg": 90
    },
    "rain": {
      "1h": 1.48
    },
    "clouds": {
      "all": 71
    },
    "dt": 1604952520,
    "sys": {
      "type": 1,
      "id": 1414,
      "country": "GB",
      "sunrise": 1604905727,
      "sunset": 1604938804
    },
    "timezone": 0,
    "id": 2643743,
    "name": "London",
    "cod": 200
  };

  getCityAutoFillMock(userInput){
    let observable$ = Observable.create( ( observer ) => {
      observer.next( this.mockData );
      observer.complete();
    } );
    return observable$;
  }


  getCityAutoFill(userInput){
    let reqOptions = this.options;
    reqOptions.params.namePrefix = userInput;
    return this.performGetCityAutofill(reqOptions);
  }

  transformGetCityAutofillResponse(cityAutofillResponse){
    console.log(cityAutofillResponse);
    let listOfCities = [];
    if(cityAutofillResponse.data){
      cityAutofillResponse.data.map((city) =>{
        if(!listOfCities.find(el => el === city.name)){
          listOfCities.push(city.name);
        }
      });
    }
    return listOfCities;
  }

  protected performGetCityAutofill(reqOptions){
    let observable$ = Observable.create( ( observer ) => {
      axios.request(reqOptions)
        .then( ( response ) => {
          observer.next( this.transformGetCityAutofillResponse(response.data) );
          observer.complete();
        } )
        .catch( ( error ) => {
          observer.error( error );
        } );
    } );
    return observable$;
  }

}
