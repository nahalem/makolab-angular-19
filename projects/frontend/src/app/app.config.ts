import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { MatNativeDateModule } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
    ),
    //  provideAnimations(),
    importProvidersFrom(
      LayoutModule,
      NgxSpinnerModule.forRoot(),
      ToastrModule.forRoot(),
      MatNativeDateModule
    ),
    provideHttpClient(), // resource API działa z tym
    provideRouter(routes,
      withPreloading(PreloadAllModules),
      withDebugTracing(),
    ),
  ]
};
