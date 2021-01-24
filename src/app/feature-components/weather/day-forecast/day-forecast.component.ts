import {Component, Input, OnInit} from '@angular/core';
import {CityDateService} from "../../../sevices/city-date.service";

@Component({
  selector: 'weather-day-forecast',
  templateUrl: './day-forecast.component.html',
  styleUrls: ['./day-forecast.component.scss']
})
export class DayForecastComponent {

  @Input() cityWeather;
  @Input() weatherIconImgSrc;
  @Input() cityDate;

  constructor(private cityDateService: CityDateService) { }


  getCurrentCityDateTime(){
    let dayTimeString = '';
    if(this.cityDate){
      const d = new Date(this.cityDate);
      dayTimeString = this.cityDateService.getDayOfWeek(d) + ' ' + d.getHours() + ':' + this.getMinutes(d);
    }
    return dayTimeString;
  }

  getMinutes(dateTime){
    if(dateTime.getMinutes() < 10){
      return "0" + dateTime.getMinutes();
    } else return dateTime.getMinutes();
  }

}
