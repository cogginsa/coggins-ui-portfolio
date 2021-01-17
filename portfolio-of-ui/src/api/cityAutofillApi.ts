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


  mockdata = {
    "data":[
      {
        "id":45633,
        "wikiDataId":"Q84",
        "type":"CITY",
        "city":"London",
        "name":"London",
        "country":"United Kingdom",
        "countryCode":"GB",
        "region":"England",
        "regionCode":"ENG",
        "latitude":51.507222222,
        "longitude":-0.1275
      },
      {
        "id":126549,
        "wikiDataId":"Q65",
        "type":"CITY",
        "city":"Los Angeles",
        "name":"Los Angeles",
        "country":"United States of America",
        "countryCode":"US",
        "region":"California",
        "regionCode":"CA",
        "latitude":34.05223,
        "longitude":-118.24368
      },
      {
        "id":14874,
        "wikiDataId":"Q68862",
        "type":"CITY",
        "city":"Longyan",
        "name":"Longyan",
        "country":"People's Republic of China",
        "countryCode":"CN",
        "region":"Fujian",
        "regionCode":"FJ",
        "latitude":25.088056,
        "longitude":117.024444
      },
      {
        "id":141180,
        "wikiDataId":"Q519810",
        "type":"CITY",
        "city":"Longnan",
        "name":"Longnan",
        "country":"People's Republic of China",
        "countryCode":"CN",
        "region":"Gansu",
        "regionCode":"GS",
        "latitude":33.535,
        "longitude":105.349
      },
      {
        "id":13884,
        "wikiDataId":"Q1025428",
        "type":"CITY",
        "city":"Longhai City",
        "name":"Longhai City",
        "country":"People's Republic of China",
        "countryCode":"CN",
        "region":"Fujian",
        "regionCode":"FJ",
        "latitude":24.44647,
        "longitude":117.81216
      },
      {
        "id":107214,
        "wikiDataId":"Q3792",
        "type":"CITY",
        "city":"Lomé",
        "name":"Lomé",
        "country":"Togo",
        "countryCode":"TG",
        "region":"Maritime",
        "regionCode":"M",
        "latitude":6.131944444,
        "longitude":1.222777777
      },
      {
        "id":115721,
        "wikiDataId":"Q43668",
        "type":"CITY",
        "city":"Louisville",
        "name":"Louisville",
        "country":"United States of America",
        "countryCode":"US",
        "region":"Kentucky",
        "regionCode":"KY",
        "latitude":38.256111111,
        "longitude":-85.751388888
      }
    ],
    "links":[
      {
        "rel":"first",
        "href":"/v1/geo/cities?offset=0&limit=7&includeDeleted=none&minPopulation=1000&types=CITY&sort=-population&namePrefix=lo"
      },
      {
        "rel":"next",
        "href":"/v1/geo/cities?offset=7&limit=7&includeDeleted=none&minPopulation=1000&types=CITY&sort=-population&namePrefix=lo"
      },
      {
        "rel":"last",
        "href":"/v1/geo/cities?offset=1099&limit=7&includeDeleted=none&minPopulation=1000&types=CITY&sort=-population&namePrefix=lo"
      }
    ],
    "metadata":{
      "currentOffset":0,
      "totalCount":1103
    }
  };

  getCityAutoFillMock(userInput){
    let observable$ = Observable.create( ( observer ) => {
      observer.next( this.mockdata );
      observer.complete();
    } );
    return observable$;
  }


  getCityAutofillApi(userInput){
    let reqOptions = this.options;
    reqOptions.params.namePrefix = userInput;
    return this.performGetCityAutofill(reqOptions);
  }

  transformGetCityAutofillResponse(cityAutofillResponse){
    let listOfCities = [];
    if(cityAutofillResponse.data){
      cityAutofillResponse.data.map((city) => {
        if(!listOfCities.find(el => el === city.name)){
          listOfCities.push({name: city.name, id: city.id});
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
