export class FacturaModel{
    id: number;
    fechaFactura!: Date;
    idCliente: number;
    numeroFactura!: number;
    numeroTotalArticulos!: number;
    subTotalFactura!: number;
    totalImpuesto!: number;
    totalFactura!: number;

    constructor(){
        this.id = 0;
        this.idCliente = 0;
        this.subTotalFactura = 0;
        this.totalImpuesto = 0;
        this.totalFactura = 0;
        this.numeroTotalArticulos = 0;
    }
}