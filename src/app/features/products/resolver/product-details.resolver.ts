import { Injectable } from "@angular/core";
import { Product, ProductService } from "../services/product.service";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, EMPTY } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductDetailsResolver implements Resolve<Product> {

    constructor(private router: Router, private productService: ProductService) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const id = Number(route.paramMap.get('id'));
        if(!id){
        this.router.navigate(['/products']);
            return EMPTY;
        }
        return this.productService.getById(id).pipe(
            catchError(()=>{
                this.router.navigate(['/products']);
                 return EMPTY;
            })
        )
    }

}