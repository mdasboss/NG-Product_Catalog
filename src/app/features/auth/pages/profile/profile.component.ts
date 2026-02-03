import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService, AuthUser } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit{
  user$: Observable<AuthUser | null> = this.auth.user$;
  constructor(private auth:AuthService, private router:Router){}
  ngOnInit(): void {
   
  

  }

  

logout(): void {
    this.auth.logout();
    // Optionally navigate away from profile after logout
    this.router.navigateByUrl('/auth/login');
  }


}
