import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InProgressService {

    progressFeatures = {
        summary: true,
        contact: true,
        about: true
    };

    isFeatureInProgress = (feature: string):boolean => !this.progressFeatures[feature];
}
