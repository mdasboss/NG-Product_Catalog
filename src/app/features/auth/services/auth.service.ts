import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { BehaviorSubject, delay, map, Observable, tap } from "rxjs";
import { ApiConfiguration } from "../../../core/services/api-config.service";
import { isPlatformBrowser } from "@angular/common";

export interface AuthUser {
    id: number,
    name: string,
    email: string
}

export interface AuthToken {
    token: string
}

export interface loginPayload { email: string, password: string }
export interface signupPayload { name: string, email: string, password: string }

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _tokenKey = 'app_token';
    private isBrowser: boolean;
    private _user$ = new BehaviorSubject<AuthUser | null>(null);
    user$ = this._user$.asObservable();
    isAuth$ = this.user$.pipe(map(user => !!user));

    constructor(private httpClient: HttpClient, private api: ApiConfiguration, @Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
     }


   
get token(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this._tokenKey);
  }


        
    setToken(token: string) {
        if (!this.isBrowser) return;
        localStorage.setItem(this._tokenKey, token);
    }

    
clearToken() {
    if (!this.isBrowser) return;
    localStorage.removeItem(this._tokenKey);
  }



    login(payload: loginPayload){
        const params = new HttpParams()
        .set('email', payload.email)
        .set('password', payload.password)

        return this.httpClient.get<AuthUser[]>(this.api.endpoints.user, {params}).pipe(
            map(users =>{
                const user = users[0];
                if(!user) throw new Error('Invalid Credentials');
                const token = btoa(`${user.id}:${user.email}:${Date.now()}`);
                this.setToken(token)
                this._user$.next(user); 
                return {token};  
            })
        );
    }

    
    
       
  signup(payload: signupPayload) {
    return this.httpClient.post<AuthUser>(this.api.endpoints.user, payload).pipe(
      tap(user => {
        const token = btoa(`${user.id}:${user.email}:${Date.now()}`);
        this.setToken(token);
        this._user$.next(user);
      }),
      map(() => ({ token: this.token! }))
    );
  }


        
    logout() {
    this.clearToken();
    this._user$.next(null);
    }


     
 /** Restore user after refresh */
  restoreSession() {
    if (!this.token) return;
    // No /me → decode token or re-fetch users if needed
  }

    




}