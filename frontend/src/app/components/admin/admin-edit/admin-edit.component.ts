import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent  implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Adicionar '

  constructor(private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private  aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      userName: ['', Validators.required],
      access: ['', Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id != 0){
      this.operacion = 'Editar '
      this.getUser(this.id)
    }
  }

  getUser(id: number){
    this.loading = true;
    this._userService.getUser(id).subscribe((data:User) => {
      this.loading = false;
      this.form.setValue({
        id: data.id,
        userName: data.userName,
        access: data.access,
      })
    })
  }

  editUser() {
    const user: User = {
      userName: this.form.value.userName,
      password: this.form.value.password,
      access: this.form.value.access,
    }

    this.loading = true;
      user.id = this.id;
      this._userService.updateUser(this.id, user).subscribe(() => {
        this.toastr.info(`O usuaio ${user.userName} foi atualizado!`, 'Produto atualizado');
        this.loading = false;
        this.router.navigate(['/admin']);
      })
  }
}
