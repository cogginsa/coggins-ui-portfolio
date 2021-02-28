import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WeatherApiService} from "../../../api/weatherApi";
import {fromEvent, Observable, OperatorFunction} from "rxjs";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, startWith, timeout} from "rxjs/operators";
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {CityAutofillApiService} from "../../../api/cityAutofillApi";
import {CityApiService} from "../../../api/cityApi";
import {CityDateService} from "../../sevices/city-date.service";
import {UserLocationService} from "../../sevices/user-location.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit, AfterViewInit {

@ViewChild('matAutocompleteInput') matAutocompleteInput: ElementRef;

  userSearchParam = '';
  cityWeather = null;
  weatherIconImgSrc = null;
  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<any>;
  cityDate: string;

  input = document.getElementById('my-input');

  constructor(private weatherApiService: WeatherApiService,
              private cityAutofillApiService: CityAutofillApiService,
              private cityApiService: CityApiService,
              private cityDateService: CityDateService,
              private userLocationService: UserLocationService) {}

  ngOnInit() {
    this.userLocationService.getLocation();
    this.subscribeToCurrentWeather({name: 'london, uk', id: "45633"});
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  public getDisplayFn() {
    return (val) => this.display(val);
  }

  private display(user): string {
    return user ? user.name : user;
  }

  updateAutofill(userInput){
    if(this.shouldPerformRequest(userInput) && userInput.length > 2) {
      this.getCityAutoFill(userInput);
    }
  }

  shouldPerformRequest(userInput): boolean{
    return this.userSearchParam.search(userInput) < 0;
  }

  getCityAutoFill(userInput){
    this.userSearchParam = userInput;
    this.cityAutofillApiService.getCityAutofillApi(userInput).subscribe((cityAutofill) => {
      this.options = cityAutofill;
    });
  }

  setCurrentCityDateTime(selectedCity){
    this.cityApiService.getCityTime(selectedCity).subscribe((cityDateTimeResponse) => {
      this.cityDate = cityDateTimeResponse.data;
    });
  }

  removeMili(cityDateTime){
    return cityDateTime.split(".")[0];
  }

  getCurrentWeather(selectedValue){
    this.subscribeToCurrentWeather(selectedValue);
  }

  subscribeToCurrentWeather(city){
    this.weatherApiService.getWeatherByCityMock(city.name).subscribe((cityWeatherResp) => {
      this.cityWeather = cityWeatherResp;
      this.setWeatherIconImg(cityWeatherResp.weather[0]);
      this.setCurrentCityDateTime(city.id);
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.matAutocompleteInput.nativeElement, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(data => this.updateAutofill(data));
  }

  setWeatherIconImg(weatherGroup){
    this.weatherIconImgSrc = `../../assets/weather-icons/${weatherGroup.icon}.png`;
  }

  private _filter(value) {
    const filterValue = value.name ? value.name.toLowerCase() : value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
