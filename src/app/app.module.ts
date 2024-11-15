import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';

//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';

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
import { TipoProductoComponent } from './components/tipo-producto/tipo-producto.component';
import { CrearTipoproductoComponent } from './components/crear-tipoproducto/crear-tipoproducto.component';
import { ModalesComponent } from "./components/modales/modales.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PedidosComponent } from './components/pedidos/pedidos.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





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
    DashboardComponent,
    TipoProductoComponent,
    CrearTipoproductoComponent,
    ModalesComponent,
    PedidosComponent,
  ],
  imports: [ 
    BrowserAnimationsModule,
    ToastrModule.forRoot( {positionClass: 'toast-top-right',}),
    BrowserModule,
    //firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
