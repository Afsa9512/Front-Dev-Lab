import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FacturaModel } from 'src/app/models/factura.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-factura',
  templateUrl: './listar-factura.component.html',
  styleUrls: ['./listar-factura.component.scss']
})
export class ListarFacturaComponent {
  @ViewChild('search', { static: true }) inputSearch!: ElementRef;
  @ViewChild('idCliente', { static: true }) selectCliente!: ElementRef;

  facturas: FacturaModel[] = [];
  clientes: any[] = [];
  search!: '';
  idCliente!: '';
  icon = 'compass';
  title= 'Facturas';
  opcionSeleccionada!: string;
  verSearch!: boolean;
  verSelect!: boolean;

  constructor( private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.buscarClientes();
    this.verSearch = true;
    this.verSelect = true;
  }

  Submit(Form: NgForm)
  {
  }

  validar(){
    if (this.opcionSeleccionada == 'opcion1') {
      this.verSearch = true;
      this.verSelect = false;
      this.search = '';
    }else{
      this.verSearch = false;
      this.verSelect = true;
      this.idCliente = '';
    }
    this.filter;
  }

  buscar(){
    this.api.get('facturas').subscribe(
      (resp: any)=>{
        this.facturas = resp;
      }
    );
  }

  buscarClientes(){
    this.api.get('clientes').subscribe(
      (resp: any)=>{
        this.clientes = resp;
        this.clientes.unshift({
          id: '',
          razonSocial: 'Seleccione un cliente...'
        });
      }
    );
  }

  filter(){
    if (this.search !== undefined || this.idCliente !== undefined && (this.search !== '' || this.idCliente !== "")) {
      var datoBuscar = (this.idCliente !== undefined && this.idCliente !== "") ? this.idCliente : this.search;
      this.api.getId('facturas/GetFacturaByFilter?filter=',datoBuscar).subscribe(
        (resp: any)=>{
          if (resp.length > 0) {
            this.facturas = resp;            
          }else{
            this.facturas = [];
          }
        }
      );
    }
  }

  keyupSearch(e: any)
  {
    if (e.keyCode === 13)
    {
      this.filter();
    }
  }

  register(id: string){
    if (id===''){ // Registro Nuevo
      this.route.navigate(['facturasCreate','']);
    }
  }

  UpdateState(farm: any, idx: number){
    farm.state = farm.state ? false : true;
    farm.loginUser = String(localStorage.getItem('userName'));
    this.api.put('farms', farm).subscribe(
      (resp:any) =>
      {
        if (resp.error) {
            Swal.fire('Error al cambiar de estado a la finca','Se presentó un error al cambiar de estado', 'error');
        } else {
          this.buscar();
          Swal.fire(
            {
              title: '',
              html:    '<span class="text-primary">Registro Actualizado</span>',
              icon: 'success',
              customClass: {
                title: 'text-primary'
              }
          }
          );
        }
      }
    );
  }
}
