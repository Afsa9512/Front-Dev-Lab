import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearFacturaComponent } from './components/facturas/crear-factura/crear-factura.component';
import { ListarFacturaComponent } from './components/facturas/listar-factura/listar-factura.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListarProductoComponent } from './components/productos/listar-producto/listar-producto.component';
import { CrearProductoComponent } from './components/productos/crear-producto/crear-producto.component';
import { ListarTipoClienteComponent } from './components/tipo-clientes/listar-tipo-cliente/listar-tipo-cliente.component';
import { CargarImagenComponent } from './components/productos/crear-producto/cargar-imagen/cargar-imagen.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearFacturaComponent,
    ListarFacturaComponent,
    ListarProductoComponent,
    CrearProductoComponent,
    ListarTipoClienteComponent,
    CargarImagenComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
