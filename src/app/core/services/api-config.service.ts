import { Injectable } from "@angular/core";
Injectable({ providedIn: 'root' })
export class ApiConfiguration {
    readonly baseUrl = 'http://localhost:3000';
    endpoints = {
        user: `${this.baseUrl}/users`,
        products: `${this.baseUrl}/products`,
        categories: `${this.baseUrl}/categories`,
    };



}