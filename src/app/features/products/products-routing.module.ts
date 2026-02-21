import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductHomeComponent } from './pages/product-home/product-home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductDetailsResolver } from './resolver/product-details.resolver';

const routes: Routes = [
  {path:'',component:ProductHomeComponent},
  {path:'produt-details/:id', component:ProductDetailsComponent,  resolve: { product: ProductDetailsResolver },
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
