import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { Subscriber, timeout } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
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

    ngOnInit(): void {}

    addUser(): void {
      if (this.form.valid) {
        this.loading = true;
        const newUser: User = {
          userName: this.form.value.userName,
          password: this.form.value.password,
        };
        this._userService.addUser(newUser).subscribe(
          () => {
            this.loading = false;
            this.toastr.success('Usuário adicionado com sucesso!', 'Sucesso');
            this.router.navigate(['/'])
          },
          error => {
            this.loading = false;
            console.error(error);
            this.toastr.error('Usuário já cadastrado.', 'Erro');
          }
        );
      }
    }

}

