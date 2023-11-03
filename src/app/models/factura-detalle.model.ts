export class FacturaDetalleModel{
    id: number;
    idFactura!: number;
    idProducto!: number;
    cantidadDeProducto!: number;
    precioUnitarioProducto!: number;
    subTotalProducto!: number;
    notas!: string;
    nombreProducto!: string;
    imagenProducto!: string;

    constructor(){
        this.id = 0;
    }
}