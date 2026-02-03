import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  isAuth$ = this.auth.isAuth$;
  constructor(private auth:AuthService, private router:Router){}

  ngOnInit(): void {
  }

    logout(): void {
        this.auth.logout();
         // Optionally navigate away from profile after logout
       this.router.navigateByUrl('/auth/login');
      }
                                      
}
