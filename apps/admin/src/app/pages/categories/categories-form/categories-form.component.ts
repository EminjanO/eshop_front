import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@eshop-front/products';
import { MessageService } from 'primeng/api';
import { firstValueFrom, timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentCategoryId!: string;

  constructor(private messageService: MessageService,
    private formbuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name:['', Validators.required],
      icon:['', Validators.required],
      color: ['#ffffff']
    });

    this._checkEditMode();
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid) return;

    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    }

    if(this.editmode){
      this._updateCategory(category);
    }else{
      this._addCategory(category);
    }
  }

  onCancel(){

  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      {
        next : (categ: Category) => this.messageService.add({ severity:'success', summary:'Success', detail:`Catefory ${categ.name} is created!`}),
        error : (e) => this.messageService.add({ severity:'error', summary:'Error', detail:'Catefory is NOT created!'}),
        // complete: () => timer(2000).toPromise().then(done => { this.location.back();}) toPromise is deprecated
        complete: () => firstValueFrom(timer(2000)).then(() => { this.location.back();})
      }
    // (response) => { this.messageService.add({ severity:'success', summary:'Success', detail:'Catefory is created!'});
    // timer(2000).toPromise().then(done => { this.location.back();})},
    // (error)=>{ this.messageService.add({ severity:'error', summary:'Error', detail:`Category is not created!`});}
    );
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
      {
        next : (categ: Category) => this.messageService.add({ severity:'success', summary:'Success', detail:`Catefory ${categ.name} is updated!`}),
        error : (e) => this.messageService.add({ severity:'error', summary:'Error', detail:'Catefory is NOT updated!'}),
        complete: () => firstValueFrom(timer(2000)).then(() => { this.location.back();})
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe({
      next: (param) => {
        if(param.id){
          this.editmode = true;
          this.currentCategoryId = param.id;

          this.categoriesService.getCategory(param.id).subscribe({
            next: (c) => {
              this.categoryForm.name.setValue(c.name);
              this.categoryForm.icon.setValue(c.icon);
              this.categoryForm.color.setValue(c.color);
            }
          })
        }
      }
    })
  }

  get categoryForm(){
    return this.form.controls;
  }

}
