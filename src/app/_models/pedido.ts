import { Detalle } from "./detalle";

export interface Pedido {
    id : string;
    nromesa: string;
    denominacion: string;
    detalle: string;
    estado: string;
    estadoDesc?: string;
    lista: Detalle[];
}
