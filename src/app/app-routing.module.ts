import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearFacturaComponent } from './components/facturas/crear-factura/crear-factura.component';
import { ListarFacturaComponent } from './components/facturas/listar-factura/listar-factura.component';

const routes: Routes = [
  { path: 'facturasCreate/:id', component: CrearFacturaComponent },
  { path: 'facturasList', component: ListarFacturaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
