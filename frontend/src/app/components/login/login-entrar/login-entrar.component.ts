import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { timeout } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-entrar',
  templateUrl: './login-entrar.component.html',
  styleUrl: './login-entrar.component.css'
})
export class LoginEntrarComponent implements OnInit{

  form: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private _userService: UserService,
              private router: Router,
              private toastr: ToastrService,
              private  aRouter: ActivatedRoute) {
              this.form = this.fb.group({
                userName: ['', Validators.required],
                password: ['', Validators.required],
                })
               } 

  ngOnInit(): void {

  }

  addUser() {
    const user: User = {
      userName: this.form.value.userName,
      password: this.form.value.password,
    }

    this.loading = true;
      // Para adicionar
      this._userService.saveUser(user).subscribe(() => {
        this.toastr.success(`O usuario ${user.userName} foi adicionado!`, 'Usuario registrado');
        this.loading = false;
        this.router.navigate(['/']);
      })
    }

}
