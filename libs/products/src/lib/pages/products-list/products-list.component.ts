import { Component, OnInit } from '@angular/core';
import { Category } from '@bluebits/products';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  constructor(private prodServices: ProductsService, private catServices: CategoriesService) {}

  ngOnInit(): void {
    this._getProducts();
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.prodServices.getProducts(categoriesFilter).subscribe((resProducts) => {
      this.products = resProducts;
    });
  }

  private _getCategories() {
    this.catServices.getCategories().subscribe((resCats) => {
      this.categories = resCats;
    });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);

    this._getProducts(selectedCategories);
  }
}
