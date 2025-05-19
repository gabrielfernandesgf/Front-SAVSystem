import { ApplicationConfig, provideZoneChangeDetection,  } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';

import { importProvidersFrom } from '@angular/core';
import { FormsModule} from '@angular/forms';

//PrimeNG
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {TagModule} from 'primeng/tag';
import {CalendarModule} from 'primeng/calendar';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      FormsModule,
      PanelModule,
      InputTextModule,
      ButtonModule,
      TableModule,
      DropdownModule,
      CheckboxModule,
      TagModule,
      CalendarModule
    ),
    providePrimeNG({
      theme: {
        preset: Aura,
      }
    })
  ]
};
