import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';

import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { makolabRoutes } from './makolab.routes';

export const makolabConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      makolabRoutes,
      withViewTransitions(),   // 👈
      withComponentInputBinding()
      ),
    provideClientHydration(),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-full-width'
    }), // Toastr providers
  ]
};
