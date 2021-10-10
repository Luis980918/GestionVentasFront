import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ClientesComponent } from './pages/clientes/clientes.component';
import {ShareModule} from './share/share.module';
import {MessageService} from 'primeng/api';
import { ClienteDetalleComponent } from './pages/clientes/cliente-detalle/cliente-detalle.component';
import { CiudadesComponent } from './pages/ciudades/ciudades.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { DepartamentoDetalleComponent } from './pages/departamentos/departamento-detalle/departamento-detalle.component';
import { CiudadDetalleComponent } from './pages/ciudades/ciudad-detalle/ciudad-detalle.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoDetalleComponent } from './pages/productos/producto-detalle/producto-detalle.component';
import {InputSwitchModule} from 'primeng/inputswitch';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    InputSwitchModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ShareModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ClientesComponent,
    ClienteDetalleComponent,
    CiudadesComponent,
    DepartamentosComponent,
    DepartamentoDetalleComponent,
    CiudadDetalleComponent,
    ProductosComponent,
    ProductoDetalleComponent,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
