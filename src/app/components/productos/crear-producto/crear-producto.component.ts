import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoModel } from 'src/app/models/producto.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent {

  id!: string;
  icon = 'compass';
  title= 'Productos';
  subtitle!: string;
  producto = new ProductoModel();

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    if (this.id === '0' || this.id === '') {
      this.subtitle = 'CREANDO';
      this.producto = new ProductoModel();
    }
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
        this.api.post('productos',this.producto).subscribe(
          (resp: any)=>{
          if (resp.error) {
              Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
          } else {
            this.router.navigateByUrl(`/farms`);
          }
        });
      }
    });
  }

}
