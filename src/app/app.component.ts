import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Front-Dev-Lab';

  constructor(private route: Router){}

  registrarFactura(){
      this.route.navigate(['facturasCreate','0']);
    }

  consultarFactura(){
      this.route.navigate(['facturasList']);
    }
}
