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
    this.loading.next(true);
  }

  hideLoader(){
    this.loading.next(false);
  }

}
