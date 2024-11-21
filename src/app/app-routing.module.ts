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


const routes: Routes = [

  {path:'', component:LoginComponent},
  {path:'listar-productos', component:ListarProductosComponent},
  {path:'crear-producto', component:CrearProductoComponent},
  {path:'editar-producto/:id', component:CrearProductoComponent},
  {path:'catalogo', component:CatalogoComponent},
  {path:'usuarios', component:UsersComponent},
  {path:'crear-usuario', component:CrearUsuarioComponent},
  {path:'ventas',component:VentasComponent},
  {path:'produccion', component:ProduccionComponent},
  {path:'categorias', component:CategoriasComponent},
  {path:'inventario', component:InventarioComponent},
  {path:'roles', component:RolesComponent},
  {path:'reportes', component:ReportesComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'tipo-producto', component:TipoProductoComponent},
  {path:'editar-tipoproducto/:id', component:CrearTipoproductoComponent},
  {path:'crear-tipoproducto', component:CrearTipoproductoComponent},
  {path:'pedidos', component:PedidosComponent},
  {path:'stock-categoria', component:StockCategoriaComponent},
  
  {path:'modales', component:ModalesComponent},
  {path:'**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
