import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { authInterceptor } from '../auth/auth.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { RecipeService } from './services/recipe.service';

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideRouter(routes),
      provideHttpClient(withInterceptors([authInterceptor])),
      RecipeService
    ]

};
