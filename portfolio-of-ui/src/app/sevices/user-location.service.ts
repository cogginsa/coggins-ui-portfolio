import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
          console.log(position)
          if (position) {

            console.log("Latitude: " + position.coords.latitude +
              "Longitude: " + position.coords.longitude);
          }
        },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}
