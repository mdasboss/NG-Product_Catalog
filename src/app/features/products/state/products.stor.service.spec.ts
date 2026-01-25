import { TestBed } from '@angular/core/testing';

import { ProductsStorService } from './products.stor.service';

describe('ProductsStorService', () => {
  let service: ProductsStorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsStorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
