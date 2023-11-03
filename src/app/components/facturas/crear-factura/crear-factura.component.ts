import { BrowserPlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturaDetalleModel } from 'src/app/models/factura-detalle.model';
import { FacturaModel } from 'src/app/models/factura.model';
import { ProductoModel } from 'src/app/models/producto.model';
import { ViewModelFacturaModel } from 'src/app/models/view-model-factura.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.scss']
})
export class CrearFacturaComponent {

  id!: string;
  icon = 'compass';
  title= 'Nueva Factura';
  titleDetail = 'Detalle'
  subtitle!: string;
  factura = new FacturaModel();
  facturaDetalle = new FacturaDetalleModel();
  facturaDetalleVM = new ViewModelFacturaModel();
  idxSeleccionado!: number;
  regsDetail: FacturaDetalleModel [] = [];
  clientes: any[] = [];
  productos: ProductoModel[] = [];
  productoSeleccionado = new ProductoModel();
  subtotal = 0;
  impuestos = 0;
  total = 0;

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.Clientes();
    this.Productos();
  }

  Clientes(){
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

  Productos(){
    this.api.get('Productos').subscribe(
      (resp: any)=>{
        this.productos = resp;
        this.productos.unshift({
          id: 0,
          nombreProducto: 'Seleccione un producto...',
          ext: '',
          imagenProducto: '',
          precioUnitario: 0
        });
      }
    );
  }

  buscarProducto(){
    this.api.getId('Productos/GetProductoById?idProducto=', this.facturaDetalle.idProducto).subscribe(
      (resp: any)=>{
        this.productoSeleccionado = resp;
      }
    );
  }

  OnBlurNumeroFactura(event: any) {
    const ID = event.target.value;

    if(ID){
      const numeroFactura = String(ID);
      this.api.getId('facturas/GetFacturaByNumero?numeroFactura=', numeroFactura).subscribe(
        (resp: any)=>{
          if (resp.id > 0){
            Swal.fire(
              {
                title: 'Error',
                html:    '<span class="text-primary">El número de factura que esta intentando ingresar ya fue utilizado en otra factura</span>',
                icon: 'error',
                customClass: {
                  title: 'text-primary'
                }
              }
            );
            var clienteSelect = this.factura.idCliente;
            this.factura = new FacturaModel();
            this.factura.idCliente = clienteSelect;
          }
        }
      );
    }
  }

  AgregarProducto(){
    if (this.productoSeleccionado.id > 0 && this.facturaDetalle.cantidadDeProducto > 0) {
      if (!this.validarProductoExiste()) {
        this.facturaDetalle.nombreProducto = this.productoSeleccionado.nombreProducto;
        this.facturaDetalle.imagenProducto = this.productoSeleccionado.imagenProducto;
        this.facturaDetalle.precioUnitarioProducto = this.productoSeleccionado.precioUnitario;
        this.facturaDetalle.subTotalProducto = this.facturaDetalle.cantidadDeProducto * this.productoSeleccionado.precioUnitario;
        this.regsDetail.push(this.facturaDetalle);
        // calcular datos de totales
        this.factura.numeroTotalArticulos += this.facturaDetalle.cantidadDeProducto;
        this.factura.subTotalFactura += (this.facturaDetalle.cantidadDeProducto * this.productoSeleccionado.precioUnitario);
        this.factura.totalImpuesto = this.factura.subTotalFactura * 0.19;
        this.factura.totalFactura = this.factura.subTotalFactura + this.factura.totalImpuesto;
        
        this.facturaDetalle = new FacturaDetalleModel();
        this.productoSeleccionado = new ProductoModel();   
      }else{
        Swal.fire(
          {
            title: 'Error',
            html:    '<span class="text-primary">El producto que intenta registrar ya esta ingresado</span>',
            icon: 'error',
            customClass: {
              title: 'text-primary'
            }
          }
        );
      }
    }else{
      Swal.fire(
        {
          title: 'Error',
          html:    '<span class="text-primary">Producto o Cantidad del producto incorrectos</span>',
          icon: 'error',
          customClass: {
            title: 'text-primary'
          }
        }
      );
    }
  }

  validarProductoExiste(){
    var resp = false;
    this.regsDetail.forEach(element => {
      if (Number(element.idProducto) === this.productoSeleccionado.id) {
        resp =  true;
      }
    });
    return resp;
  }

  NuevaFactura(){
    this.factura = new FacturaModel();
    this.facturaDetalle = new FacturaDetalleModel();
    this.productoSeleccionado = new ProductoModel();
    this.regsDetail = [];
  }

  Submit( form: NgForm){
    if (form.invalid) {
      Object.values(form.controls).forEach( ctrl => {
        ctrl.markAsTouched();
      });

      Swal.fire(
        {
          title: 'Error',
          html:    '<span class="text-primary">Hacen falta campos obligatorios</span>',
          icon: 'error',
          customClass: {
            title: 'text-primary'
          }
        }
      );
      return;
    }
    Swal.fire(
      {
        title: 'Confirmar Guardar !!!',
        html:    '<span class="text-primary">¿Está seguro de guardar el registro actual?</span>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        customClass: {
          title: 'text-primary'
        }
      }
    ).then((result)=> {
      if (result.isConfirmed) {
        this.factura.fechaFactura = new Date;
        this.facturaDetalleVM.entityFactura = this.factura;
        this.facturaDetalleVM.detallesFactura = this.regsDetail;
          this.api.post(`facturas/`,this.facturaDetalleVM).subscribe(
            (resp: any)=>{
            if (resp.error) {
                Swal.fire('Error al crear la factura','Se presentó un error al crear la factura', 'error');
            } else {
              this.router.navigateByUrl('');
            }
          });
      }
    });
  }


  // Save Movement detail
  SubmitDetail( form: NgForm){
  //   if (form.invalid) {
  //     Object.values(form.controls).forEach( ctrl => {
  //       ctrl.markAsTouched();
  //     });
  //     Swal.fire(
  //       {
  //         title: 'Error',
  //         html:    '<span class="text-primary">Hacen falta campos obligatorios</span>',
  //         icon: 'error',
  //         customClass: {
  //           title: 'text-primary'
  //         }
  //       }
  //     );
  //     return;
  //   }
  //   Swal.fire(
  //     {
  //       title: 'Confirmar Guardar !!!',
  //       html:    '<span class="text-primary">¿Está seguro de guardar el registro actual?</span>',
  //       icon: 'question',
  //       showCancelButton: true,
  //       confirmButtonText: 'Guardar',
  //       customClass: {
  //         title: 'text-primary'
  //       }
  //     }
  //   ).then((result)=> {
  //     debugger;
  //     if (result.isConfirmed) {
  //       this.lote.codeLote = String(this.lote.codeLote);
  //       this.lote.idFarm = this.farm.id_farm;
  //       this.lote.loginUser = String(localStorage.getItem('userName'));
  //       if (this.lote.idLote === ''){
  //         this.api.post('lotes',this.lote).subscribe(
  //           (resp: any)=>{
  //           if (resp.error) {
  //               Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
  //           } else {
  //             this.buscar();
  //           }
  //         });
  //       } else {
  //         this.api.put('Lotes',this.lote).subscribe(
  //           (resp: any)=>{
  //           if (resp.error) {
  //               Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
  //           } else {
  //             this.buscar();
  //           }
  //         });
  //       }
  //       this.CleanDataDetail();
  //     }
  //   });
  }


  // Clean fields detail
  CleanDataDetail(){
    this.facturaDetalle = new FacturaDetalleModel();
  }
}
