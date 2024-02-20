import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { environment } from '../environments/environment';  // Importe as configurações do Firebase
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    ScreenTrackingService,
    UserTrackingService, importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"webstore-63a0a","appId":"1:106055559664:web:3dae7f14111d528de71535","storageBucket":"webstore-63a0a.appspot.com","apiKey":"AIzaSyAsBJ-Hh1JZHyQ7hlZBpHVmhLuP80xOLHE","authDomain":"webstore-63a0a.firebaseapp.com","messagingSenderId":"106055559664","measurementId":"G-EPF9EXME80"}))), importProvidersFrom(provideAuth(() => getAuth())),
    
  ],
};
