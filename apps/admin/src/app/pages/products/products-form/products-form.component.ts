import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category, Product, ProductsService } from '@eshop-front/products';
import { MessageService } from 'primeng/api';
import { firstValueFrom, timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {
  editmode = false;
  isSubmitted = false;
  form!: FormGroup;
  categories: Category[] = []
  imageDisplay! : string | ArrayBuffer | null;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      brand:['', Validators.required],
      price:['', Validators.required],
      category:['', Validators.required],
      countInStock:['', Validators.required],
      description:['', Validators.required],
      richDescription:[''],
      image:[''],
      isFeatured:[false],
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(
      {
        next: (cats) => this.categories = cats
      }
    );
  }

  private _addProduct(productFormData: FormData) {
      this.productService.createProduct(productFormData).subscribe(
      {
        next : (prod: Product) => this.messageService.add({ severity:'success', summary:'Success', detail:`Catefory ${prod.name} is created!`}),
        error : (e) => this.messageService.add({ severity:'error', summary:'Error', detail:'product is NOT created!'}),
        // complete: () => timer(2000).toPromise().then(done => { this.location.back();}) toPromise is deprecated
        complete: () => firstValueFrom(timer(2000)).then(() => { this.location.back();})
      }
    );
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid) return;

    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      console.log(key);
      console.log(this.productForm[key].value);
      productFormData.append(key, this.productForm[key].value);
    })
    this._addProduct(productFormData);
  }


  onCancel(){

  }

  onImageUpload(event: any){
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({image:file})
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file)
    }
  }

  get productForm(){
    return this.form.controls;
  }

}
