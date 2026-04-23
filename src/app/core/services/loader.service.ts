import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
private loading = new BehaviorSubject<boolean>(false);
loading$ = this.loading.asObservable();
  constructor() { }

  showLoader(){
    setTimeout(() => this.loading.next(true));
  }

  hideLoader(){
   setTimeout(() => this.loading.next(false))
  }

}
