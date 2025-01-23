import { ApplicationConfig } from '@angular/core';

//import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { httpInterceptorProviders } from '../app/http-interceptors/index';
import { noopInterceptorProvider } from '../app/http-interceptors/noop-interceptor';

// #region example helper services; not shown in docs
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AuthService } from '../app/auth.service';
import { HttpErrorHandler } from '../app/http-error-handler.service';
import { MessageService } from '../app/message.service';
import { RequestCache, RequestCacheWithMap } from '../app/request-cache.service';
// #endregion example helper services; not shown in docs


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(HttpClientJsonpModule),
    noopInterceptorProvider,
    httpInterceptorProviders,
    importProvidersFrom(
        HttpClientXsrfModule.withOptions({
        cookieName: 'My-Xsrf-Cookie',
        headerName: 'My-Xsrf-Header',
      })
    ),

    AuthService,
    HttpErrorHandler,
    MessageService,
    { provide: RequestCache, useClass: RequestCacheWithMap },

    // provideProtractorTestingSupport(), // essential for e2e testing
  ]
};
