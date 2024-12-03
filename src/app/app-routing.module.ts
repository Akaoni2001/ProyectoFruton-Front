import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { UsersComponent } from './components/users/users.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ProduccionComponent } from './components/produccion/produccion.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { RolesComponent } from './components/roles/roles.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TipoProductoComponent } from './components/tipo-producto/tipo-producto.component';
import { CrearTipoproductoComponent } from './components/crear-tipoproducto/crear-tipoproducto.component';
import { ModalesComponent } from './components/modales/modales.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { StockCategoriaComponent } from './components/stock-categoria/stock-categoria.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  {path:'', component:LoginComponent},
  {path:'listar-productos', component:ListarProductosComponent, canActivate: [AuthGuard] },
  {path:'crear-producto', component:CrearProductoComponent,canActivate: [AuthGuard]},
  {path:'editar-producto/:id', component:CrearProductoComponent,canActivate: [AuthGuard]},
  {path:'catalogo', component:CatalogoComponent, canActivate: [AuthGuard]},
  {path:'usuarios', component:UsersComponent,canActivate: [AuthGuard]},
  {path:'crear-usuario', component:CrearUsuarioComponent,canActivate: [AuthGuard]},
  {path:'ventas',component:VentasComponent,canActivate: [AuthGuard]},
  {path:'produccion', component:ProduccionComponent,canActivate: [AuthGuard]},
  {path:'categorias', component:CategoriasComponent, canActivate: [AuthGuard]},
  {path:'inventario', component:InventarioComponent,canActivate: [AuthGuard]},
  {path:'roles', component:RolesComponent,canActivate: [AuthGuard]},
  {path:'reportes', component:ReportesComponent,canActivate: [AuthGuard]},
  {path:'dashboard', component:DashboardComponent,canActivate: [AuthGuard]},
  {path:'tipo-producto', component:TipoProductoComponent,canActivate: [AuthGuard]},
  {path:'editar-tipoproducto/:id', component:CrearTipoproductoComponent,canActivate: [AuthGuard]},
  {path:'crear-tipoproducto', component:CrearTipoproductoComponent,canActivate: [AuthGuard]},
  {path:'pedidos', component:PedidosComponent,canActivate: [AuthGuard]},
  {path:'stock-categoria', component:StockCategoriaComponent,canActivate: [AuthGuard]},
  {path:'editar-usuario/:id', component:CrearUsuarioComponent,canActivate: [AuthGuard]},
  
  {path:'modales', component:ModalesComponent},
  {path:'**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
