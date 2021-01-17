import axios, {AxiosRequestConfig} from "axios";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

@Injectable()
export class CityApiService {
  private readonly options: AxiosRequestConfig = {
    method: 'GET',
    url: '',
    baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/',
    headers: {
      'x-rapidapi-key': '4ba3d6b503mshb6a797a989ce3ddp122552jsndc772ac4ace4',
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }
  };

mockData = {
  "data": "2020-12-12T18:59:14.502605Z"
};

private londonCityId = "45633";
private mockDateTime = "2020-12-12T18:59:14.502605Z";

  getCityTimeMock(cityId){
    let observable$ = Observable.create( ( observer ) => {
      observer.next( this.mockData );
      observer.complete();
    } );
    return observable$;
  }

  getRequestURL(cityParam){
    return this.options.url + cityParam + '/dateTime';
  }

  getCityTime(cityId){
    let requestOptions = this.options;
    requestOptions.url = cityId + '/dateTime';
    return this.performGetCity(requestOptions);
  }

  protected performGetCity(reqOptions){
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

}
