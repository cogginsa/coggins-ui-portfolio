import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LargeCardComponent } from './layout-components/large-card/large-card.component';
import { WeatherApiService } from "../api/weatherApi";
// import { WeatherComponent } from './feature-components/weather/weather.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import { NavBarComponent } from './layout-components/nav-bar/nav-bar.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { SmallCardComponent } from './layout-components/small-card/small-card.component';
import { CityAutofillApiService } from "../api/cityAutofillApi";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { SummaryComponentComponent } from './feature-components/summary-component/summary-component.component';
import { CityApiService } from "../api/cityApi";
// import { WeekForecastComponent } from './feature-components/weather/week-forecast/week-forecast.component';
// import { HourForecastComponent } from './feature-components/weather/hour-forecast/hour-forecast.component';
// import { DayForecastComponent } from './feature-components/weather/day-forecast/day-forecast.component';
import { PortfolioComponent } from './feature-components/portfolio/portfolio.component';
import { NewWeatherComponent } from './feature-components/new-weather/new-weather.component';
import { WeatherDescComponent } from './feature-components/new-weather/weather-desc/weather-desc.component';
import { WeatherAppComponent } from './feature-components/new-weather/weather-app/weather-app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './ngrx-store/reducers';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './ngrx-store/weather.effects';
import { InProgressComponent } from './feature-components/in-progress/in-progress.component';
import { AboutComponent } from './feature-components/about/about.component';
import { FooterComponent } from './feature-components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LargeCardComponent,
    NavBarComponent,
    SmallCardComponent,
    SummaryComponentComponent,
    PortfolioComponent,
    NewWeatherComponent,
    WeatherDescComponent,
    WeatherAppComponent,
    InProgressComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    StoreDevtoolsModule.instrument({
      maxAge: 25 // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
    }),
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatProgressBarModule,
    EffectsModule.forRoot([WeatherEffects]),
    StoreModule.forRoot({}, {}),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    // StoreModule.forRoot(reducers, {
    //   metaReducers
    // })
  ],
  providers: [WeatherApiService, CityAutofillApiService, CityApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

