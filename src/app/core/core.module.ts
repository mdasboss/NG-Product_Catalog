import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './services/api-config.service';
import { AuthService } from '../features/auth/services/auth.service';
import { AuthGuard } from './gurards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    
  ],
  
providers: [
  ApiConfiguration,
  AuthService,
  AuthGuard,
  // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]

})
export class CoreModule { 
  
 constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) throw new Error('CoreModule is already loaded.');
  }

}
