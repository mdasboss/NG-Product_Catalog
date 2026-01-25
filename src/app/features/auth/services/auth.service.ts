import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { delay, map } from "rxjs";

export interface User{
    id:number,
    email:string,
    name:string,
    password?:string
}

@Injectable({ providedIn:'root' })
export class AuthService{
    private baseUrl = environment.apiBase;
    constructor(private httpClient:HttpClient){}

    login(emil:string, password:string){
        const params = new HttpParams().set('email',emil).set('password',password);
        return this.httpClient.get<User[]>(`${this.baseUrl}/users`, {params}).pipe(
            delay(200),
            map(users =>{
                const user = users[0];
                if(!user) throw new Error('Invalid Credentials')
                const token = btoa(`${user.id}:${user.email}:${Date.now()}`);
                return {token, user:{id:user.id, email:user.email, name:user.name}}
            })
        ) 
    }


    signup(email:string, password:string, name:string){
        const payload= {email, password, name};
        return this.httpClient.post<User>(`${this.baseUrl}/users`, payload).pipe(delay(200))
    }
}