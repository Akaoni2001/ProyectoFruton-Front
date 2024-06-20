import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

const routes: Routes = [

  {path:'', component:LoginComponent},
  {path:'listar-productos', component:ListarProductosComponent},
  {path:'crear-producto', component:CrearProductoComponent},
  {path:'editar-producto/:id', component:CrearProductoComponent},
  {path:'catalogo', component:CatalogoComponent},
  {path:'**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
