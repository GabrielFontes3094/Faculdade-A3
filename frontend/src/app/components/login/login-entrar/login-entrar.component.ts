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

  ngOnInit(): void {}

  authenticateUser() {
    if (this.form.valid) {
      this.loading = true;
      this._userService.authenticateUser(this.form.value).subscribe(
        (response: User) => {
          console.log(response);
          // Aqui, verificamos o nível de acesso retornado pelo servidor e redirecionamos o usuário para a página apropriada.
          switch (response.access) {
            case 'admin':
              this.router.navigate(['/admin']);
              break;
              case 'usuario':
              this.router.navigate(['/usuario']);
              break;
            case 'vendedor':
              this.router.navigate(['/vendedor']);
              break;
            // Adicione mais casos conforme necessário para outros níveis de acesso.
            default:
              this.router.navigate(['/default']);
          }
          this.toastr.success('Usuário encontrado', 'Sucesso!');
          this.loading = false;
        },
        error => {
          console.error(error);
          this.toastr.warning('Usuário não existe', 'Erro!');
          this.loading = false;
        }
      );
    }
  }
}


