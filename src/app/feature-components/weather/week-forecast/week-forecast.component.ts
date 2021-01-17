import { Component, OnInit } from '@angular/core';
import {shorthandWeekdays, weekdays} from "../../../constants/weekdays";

@Component({
  selector: 'weather-week-forecast',
  templateUrl: './week-forecast.component.html',
  styleUrls: ['./week-forecast.component.scss']
})
export class WeekForecastComponent implements OnInit {

  normalViewTableHeader = weekdays;
  smallViewTableHeader = shorthandWeekdays;

  constructor() { }

  ngOnInit() {
  }

}
