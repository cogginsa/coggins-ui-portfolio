import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CityApiService } from 'src/api/cityApi';
import { CityAutofillApiService } from 'src/api/cityAutofillApi';
import { WeatherApiService } from 'src/api/weatherApi';
import { AddWeatherAction, AddWeatherFailureAction, LoadWeather } from 'src/app/actions/weather.actions';
import { CityDateService } from 'src/app/sevices/city-date.service';
import { UserLocationService } from 'src/app/sevices/user-location.service';

@Component({
  selector: 'app-weather-desc',
  templateUrl: './weather-desc.component.html',
  styleUrls: ['./weather-desc.component.scss']
})
export class WeatherDescComponent implements OnInit {

  // constructor(private formBuilder: FormBuilder) { }
  userSearchParam = '';
  cityWeather = null;
  weatherIconImgSrc = null;
  // myControl = new FormControl();
  // options = [];
  // filteredOptions: Observable<any>;
  cityDate: string;

  constructor(
    private weatherApiService: WeatherApiService,
    private store: Store,
    private formBuilder: FormBuilder,
    private cityAutofillApiService: CityAutofillApiService,
    private cityApiService: CityApiService,
    private cityDateService: CityDateService,
    private userLocationService: UserLocationService) {}

  citySearchForm = this.formBuilder.group({
    city: ''
  });

  ngOnInit(): void {
  }

  onSubmit(){
    const cityToSearch = this.citySearchForm.value.city;
    this.store.dispatch(new AddWeatherAction({weatherData: cityToSearch}));
  }

   getCurrentWeather(selectedValue){
    this.subscribeToCurrentWeather(selectedValue);
  }

    subscribeToCurrentWeather(city){
      this.weatherApiService.getWeatherByCityMock(city.name).subscribe((cityWeatherResp) => {
        this.cityWeather = cityWeatherResp;
        console.log("cityWeatherResp: ", cityWeatherResp);
        
        // this.setWeatherIconImg(cityWeatherResp.weather[0]);
        // this.setCurrentCityDateTime(city.id);
      });
    }

}
