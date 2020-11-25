import { Component, OnInit} from '@angular/core';
import {WeatherApiService} from "../../../api/weatherApi";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {CityAutofillApiService} from "../../../api/cityAutofillApi";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class WeatherComponent implements OnInit {

  userSearchParam = '';
  cityWeather = null;
  weatherIconImgSrc = null;
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  public lat;
  public lng;
  constructor(private weatherApiService: WeatherApiService, private cityAutofillApiService: CityAutofillApiService) {}

  ngOnInit() {
    this.getLocation();
    this.subscribeToCurrentWeather('london, uk');
    // this.getCityAutoFill();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  updateAutofill(userInput){
    if(this.shouldPerformRequest(userInput) && userInput.length >= 2) {
      this.getCityAutoFill(userInput);
    }
  }

  shouldPerformRequest(userInput): boolean{
    return this.userSearchParam.search(userInput) < 0;
  }

  getCityAutoFill(userInput){
    this.userSearchParam = userInput;
    this.cityAutofillApiService.getCityAutoFill(userInput).subscribe((cityAutofill) => {
      this.options = cityAutofill;
    });
  }

  getCurrentWeather(selectedValue){
    this.subscribeToCurrentWeather(selectedValue);
  }

  subscribeToCurrentWeather(city){
    this.weatherApiService.getWeatherByCityMock(city).subscribe((cityWeatherResp) => {
      this.cityWeather = cityWeatherResp;
      this.setWeatherIconImg(cityWeatherResp.weather[0]);
    });
  }


  setWeatherIconImg(weatherGroup){
    this.weatherIconImgSrc = `../../assets/weather-icons/${weatherGroup.icon}.png`;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
            console.log("Latitude: " + position.coords.latitude +
              "Longitude: " + position.coords.longitude);
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
          }
        },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


}
