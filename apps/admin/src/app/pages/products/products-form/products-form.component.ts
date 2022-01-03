import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  imageDisplay! : string | ArrayBuffer | null | undefined;
  currentProductId!: string;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
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
      image:['', Validators.required],
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

  private _updateProduct(productFormData: FormData) {
    this.productService.updateProduct(productFormData, this.currentProductId).subscribe(
      {
        next : (product: Product) => this.messageService.add({ severity:'success', summary:'Success', detail:`Catefory ${product.name} is updated!`}),
        error : (e) => this.messageService.add({ severity:'error', summary:'Error', detail:'Product is NOT updated!'}),
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
    if(this.editmode) this._updateProduct(productFormData)
    else this._addProduct(productFormData);
  }



  onCancel(){
    this.location.back();
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


  private _checkEditMode() {
    this.route.params.subscribe({
      next: (param) => {
        if(param.id){
          this.editmode = true;
          this.currentProductId = param.id;

          this.productService.getProduct(param.id).subscribe({
            next: (p) => {
              this.productForm.name.setValue(p.name);
              this.productForm.category.setValue(p.category?.id);
              this.productForm.brand.setValue(p.brand);
              this.productForm.price.setValue(p.price);
              this.productForm.countInStock.setValue(p.countInStock);
              this.productForm.isFeatured.setValue(p.isFeatured);
              this.productForm.description.setValue(p.description);
              this.productForm.richDescription.setValue(p.richDescription);
              this.imageDisplay = p.image;
              //set image validator to null/empty
              this.productForm.image.setValidators([]);
              this.productForm.image.updateValueAndValidity();
            }
          });
        }
      }
    })
  }

  get productForm(){
    return this.form.controls;
  }

}
