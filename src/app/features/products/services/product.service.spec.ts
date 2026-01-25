import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Product, ProductService } from "./product.service"
import { environment } from "../../../../environments/environment";
import { TestBed } from "@angular/core/testing";

describe('ProductService',()=>{
    let service:ProductService;
    let httpMock:HttpTestingController;
    const base = environment.apiBase;
    beforeEach(()=>{
            TestBed.configureTestingModule({
        imports:[HttpTestingController, HttpClientTestingModule],
        providers:[ProductService]
    });

    service  = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController)

    })
    
    afterEach(()=>httpMock.verify())

    
it('should fetch products list', (done) => {
    const mock: Product[] = [
      { id: 1, title: 'iPhone 15', category: 'Phones', price: 900 },
      { id: 2, title: 'MacBook Air', category: 'Laptops', price: 1200 }
    ];

  });


});
