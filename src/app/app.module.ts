import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
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






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearProductoComponent,
    ListarProductosComponent,
    SidenavComponent,
    CatalogoComponent,
    UsersComponent,
    CrearUsuarioComponent,
    VentasComponent,
    ProduccionComponent,
    CategoriasComponent,
    InventarioComponent,
    RolesComponent,
    ReportesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
