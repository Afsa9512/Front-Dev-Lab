import { FacturaDetalleModel } from "./factura-detalle.model";
import { FacturaModel } from "./factura.model";

export class ViewModelFacturaModel{
    entityFactura!: FacturaModel;
    detallesFactura: FacturaDetalleModel[] = [];
}