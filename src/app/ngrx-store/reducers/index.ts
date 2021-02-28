import { ActionReducerMap, MetaReducer, Action, createSelector} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { WeatherActionTypes, WeatherAction } from '../actions/weather.actions';

export interface WeatherState {
  weatherData;
  testing;
  weather;
}

const initialWeatherState: WeatherState = {
  weatherData: null,
  testing: 2,
  weather: null
};

export interface AppState {
  weather;
  // location;
}

// export const selectWeather = (state: AppState) => state.weather;
 
// export const selectCurrentWeather = createSelector(
//   selectWeather,
//   (state: AppState) => {
//     return state.weather
//   }
// );

export function weatherReducer(state: WeatherState = initialWeatherState, action: WeatherAction) {
  switch (action.type) {
    case WeatherActionTypes.LoadWeather:
      return {
        weatherData: action.payload.weatherData,
        isLoading: true
      };

    case WeatherActionTypes.WEATHER_HAS_FAILED:
      return {
        weather: null,
        error: action.payload.error,
        isLoading: false
      };

      case WeatherActionTypes.WEATHER_HAS_SUCCESS:
        return {
          weather: action.payload,
          error: null,
          isLoading: false
        };


    default:
      return state;
  }
}

// export function locationReducer(state: LocationState = initialLocationState, action: LocationAction) {
//   switch (action.type) {
//     case LocationActionTypes.LoadLocations:
//       return {
//         location: action.payload.locationData,
//         error: null
//       };

//     case LocationActionTypes.LocationsError:
//       return {
//         location: null,
//         error: action.payload.error
//       };

//     default:
//       return state;
//   }
// }

export const reducers: ActionReducerMap<AppState> = {

  weather: weatherReducer,
  // location: locationReducer
};

export const selectWeather = (state: AppState) => state.weather.weatherData;

// export const selectError = (state: AppState) => state.location.error;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];