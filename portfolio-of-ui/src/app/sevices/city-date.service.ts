import { Injectable } from '@angular/core';
import {weekdays} from "../constants/weekdays";

@Injectable({
  providedIn: 'root'
})
export class CityDateService {

  getDayOfWeek(cityDateTime: Date): string{
    return weekdays[cityDateTime.getDay()];
  }

}
