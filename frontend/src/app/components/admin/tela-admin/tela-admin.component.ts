import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tela-admin',
  templateUrl: './tela-admin.component.html',
  styleUrls: ['./tela-admin.component.css']
})
export class TelaAdminComponent implements OnInit{
  listUsers: User[] = [];
  loading: boolean = false;

  constructor(private _userService: UserService, private toastr: ToastrService){}

  ngOnInit(): void { 
    this.getListUsers();
   }

   getListUsers() {
    this.loading = true;
    this._userService.getListUsers().subscribe((data: User[]) => {
      this.listUsers = data;
      this.loading = false;
    })
   }

   deleteUser(id: number) {
    this.loading = true;
    this._userService.deleteUser(id).subscribe(() => {
      this.getListUsers();
      this.toastr.warning('Produto eliminado com sucesso', 'Produto eliminado');
    })
  }
}
