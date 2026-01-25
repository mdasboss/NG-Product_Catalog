import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { delay } from "rxjs";

export interface Product {
    id: number,
    title: string,
    category: 'Phones' | 'Laptops' | string,
    price: number
}
@Injectable({providedIn:'root'})


export class ProductService{
    private baseUrl = environment.apiBase;

    constructor(private http:HttpClient){}

    getProductList(){
           return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(delay(200)) 
    }

}