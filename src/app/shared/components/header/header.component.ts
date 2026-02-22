import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  isAuth$ = this.auth.isAuth$;
  totalQty$ = this.cartService.totalQty$;
  constructor(private auth:AuthService, private router:Router, private cartService:CartService){}

  ngOnInit(): void {}

    logout(): void {
        this.auth.logout();
         // Optionally navigate away from profile after logout
       this.router.navigateByUrl('/auth/login');
      }
                                      
}
