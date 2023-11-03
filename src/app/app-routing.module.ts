import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearFacturaComponent } from './components/facturas/crear-factura/crear-factura.component';
import { ListarFacturaComponent } from './components/facturas/listar-factura/listar-factura.component';
import { ListarProductoComponent } from './components/productos/listar-producto/listar-producto.component';
import { CrearProductoComponent } from './components/productos/crear-producto/crear-producto.component';
import { CrearTipoClienteComponent } from './components/tipo-clientes/crear-tipo-cliente/crear-tipo-cliente.component';
import { ListarTipoClienteComponent } from './components/tipo-clientes/listar-tipo-cliente/listar-tipo-cliente.component';

const routes: Routes = [
  { path: 'facturasCreate/:id', component: CrearFacturaComponent },
  { path: 'facturasList', component: ListarFacturaComponent },
  { path: 'productosCreate/:id', component: CrearProductoComponent },
  { path: 'productosList', component: ListarProductoComponent },
  { path: 'tipoClienteCreate/:id', component: CrearTipoClienteComponent },
  { path: 'tipoClienteList', component: ListarTipoClienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
