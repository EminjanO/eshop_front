import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@eshop-front/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products : Product[] = [];

  constructor(
    private messageService: MessageService,
    private productService : ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService
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
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productId).subscribe({
          next : (v) => {this.messageService.add({ severity:'success', summary:'Success', detail:'Catefory is deleted!'}); this._getProducts(); },
          error : (e) => this.messageService.add({ severity:'error', summary:'Error', detail:'Catefory is NOT deleted!'}),
          // complete: () => timer(2000).toPromise().then(done => { this.location.back();}) toPromise is deprecated
        });
      },
      reject: () => {}
    });
  }

  updateProduct(productId : string){
    this.router.navigateByUrl(`products/form/${productId}`)
  }

}
