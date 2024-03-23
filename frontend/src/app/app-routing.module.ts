import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { LoginComponent } from './components/login/login-criar-user/login.component';
import { LoginEntrarComponent } from './components/login/login-entrar/login-entrar.component';
import { TelaUsuarioComponent } from './components/tela-usuario/tela-usuario.component';
import { TelaAdminComponent } from './components/admin/tela-admin/tela-admin.component';
import { AdminEditComponent } from './components/admin/admin-edit/admin-edit.component';

const routes: Routes = [
  { path: '', component: LoginEntrarComponent},
  { path: 'criar-user', component: LoginComponent},
  { path: 'vendedor', component: ListProductsComponent},
  { path: 'usuario', component: TelaUsuarioComponent},
  { path: 'admin', component: TelaAdminComponent},
  { path: 'add', component: AddEditProductComponent},
  { path: 'edit/:id', component: AddEditProductComponent},
  { path: 'editUser/:id', component: AdminEditComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
