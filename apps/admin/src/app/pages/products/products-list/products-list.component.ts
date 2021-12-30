import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@eshop-front/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products : Product[] = [];

  constructor(
    private productService : ProductsService
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productService.getProducts().subscribe(
      {
        next: (products) => {this.products = products}
      }
    )
  }

  deleteProduct(productId : string){
    console.log("deleteProduct")
  }

  updateProduct(productId : string){
    console.log("updateProduct")
  }

}
