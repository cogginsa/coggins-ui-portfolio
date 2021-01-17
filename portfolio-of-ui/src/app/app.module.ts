import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LargeCardComponent } from './layout-components/large-card/large-card.component';
import { WeatherApiService } from "../api/weatherApi";
import { WeatherComponent } from './feature-components/weather/weather.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import { NavBarComponent } from './layout-components/nav-bar/nav-bar.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { SmallCardComponent } from './layout-components/small-card/small-card.component';
import {CityAutofillApiService} from "../api/cityAutofillApi";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import { SummaryComponentComponent } from './feature-components/summary-component/summary-component.component';
import {CityApiService} from "../api/cityApi";
import { WeekForecastComponent } from './feature-components/weather/week-forecast/week-forecast.component';
import { HourForecastComponent } from './feature-components/weather/hour-forecast/hour-forecast.component';
import { DayForecastComponent } from './feature-components/weather/day-forecast/day-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    LargeCardComponent,
    WeatherComponent,
    NavBarComponent,
    SmallCardComponent,
    SummaryComponentComponent,
    WeekForecastComponent,
    HourForecastComponent,
    DayForecastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatProgressBarModule,
    AngularFontAwesomeModule
  ],
  providers: [WeatherApiService, CityAutofillApiService, CityApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

