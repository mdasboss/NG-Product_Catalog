import { Component } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';
import {LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    constructor(private auth:AuthService, public loaderService:LoaderService){
          
    if (this.auth.token) {
          // this.auth.restoreSession();
        }

    }

}
