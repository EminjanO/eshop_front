import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User } from '@eshop-front/users';
import { MessageService } from 'primeng/api';
import { firstValueFrom, timer } from 'rxjs';


@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})

export class UsersFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentUserId!: string;
  countries! : unknown[];

  constructor(
    private messageService: MessageService,
    private formbuilder: FormBuilder,
    private userService: UsersService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._getCoutries();
    this._checkEditMode();
  }

  private _initUserForm() {
    this.form = this.formbuilder.group({
      name:['', Validators.required],
      password:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      phone:['', Validators.required],
      isAdmin:[false],
      street:[''],
      apartment:[''],
      zip:[''],
      city:[''],
      country:['']
    });
  }

  private _getCoutries() {
    this.countries = this.userService.getCountries();
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid) return;

    const user: User = {
      id: this.currentUserId,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      password: this.userForm.password.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,
    }

    if(this.editmode){
      this._updateUser(user);
    }else{
      this._addUser(user);
    }
  }

  onCancel(){

  }

  private _addUser(user: User) {
    this.userService.createUser(user).subscribe(
      {
        next : (user: User) => this.messageService.add({ severity:'success', summary:'Success', detail:`Catefory ${user.name} is created!`}),
        error : (e) => this.messageService.add({ severity:'error', summary:'Error', detail:'User is NOT created!'}),
        complete: () => firstValueFrom(timer(2000)).then(() => { this.location.back();})
      }
    );
  }

  private _updateUser(user: User) {
    this.userService.updateUser(user).subscribe(
      {
        next : (user: User) => this.messageService.add({ severity:'success', summary:'Success', detail:`Catefory ${user.name} is updated!`}),
        error : (e) => this.messageService.add({ severity:'error', summary:'Error', detail:'User is NOT updated!'}),
        complete: () => firstValueFrom(timer(2000)).then(() => { this.location.back();})
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe({
      next: (param) => {
        if(param.id){
          this.editmode = true;
          this.currentUserId = param.id;

          this.userService.getUser(param.id).subscribe({
            next: (u) => {
              this.userForm.name.setValue(u.name);
              this.userForm.email.setValue(u.email);
              this.userForm.isAdmin.setValue(u.isAdmin);
              this.userForm.phone.setValue(u.phone);
              this.userForm.street.setValue(u.street);
              this.userForm.apartment.setValue(u.apartment);
              this.userForm.zip.setValue(u.zip);
              this.userForm.city.setValue(u.city);
              this.userForm.country.setValue(u.country);

              this.userForm.password.setValidators([]);
              this.userForm.password.updateValueAndValidity();
            }
          })
        }
      }
    })
  }

  get userForm(){
    return this.form.controls;
  }

}
