import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@eshop-front/products'
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom, timer } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor( private messageService: MessageService,
    private categoriesService: CategoriesService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this._getCategories();
  }

  deleteCategory(categoryId: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe({
          next : (v) => {this.messageService.add({ severity:'success', summary:'Success', detail:'Catefory is deleted!'}); this._getCategories(); },
          error : (e) => this.messageService.add({ severity:'error', summary:'Error', detail:'Catefory is NOT deleted!'}),
          // complete: () => timer(2000).toPromise().then(done => { this.location.back();}) toPromise is deprecated
        });
      },
      reject: () => {}
    });
  }

  updateCategory(categoryId: string){
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  private _getCategories(){
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
    })
  }
}
