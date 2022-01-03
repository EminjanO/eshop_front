import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@eshop-front/users'
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private messageService: MessageService,
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(userId: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe({
          next : (v) => {
            this._getUsers();
            this.messageService.add({ severity:'success', summary:'Success', detail:'User is deleted!'});
        },
          error : (e) => this.messageService.add({ severity:'error', summary:'Error', detail:'User is NOT deleted!'}),
          // complete: () => timer(2000).toPromise().then(done => { this.location.back();}) toPromise is deprecated
        });
      },
      reject: () => {}
    });
  }

  updateUser(userId: string){
    this.router.navigateByUrl(`users/form/${userId}`)
  }

  getCountryName(countryKey: string){
    if(countryKey) return this.usersService.getCountry(countryKey);
    return "";
  }

  private _getUsers(){
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    })
  }
}
