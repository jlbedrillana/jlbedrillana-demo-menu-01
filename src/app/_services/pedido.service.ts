import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from '../_models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  apiPedidos: string;
  constructor(private http: HttpClient) { 
    this.apiPedidos = environment.servPedidos + '/demo/pedidos';
  }

  getListaPedido(): Observable<any> {
    const url_api = this.apiPedidos;
    return this.http.get<any>(url_api).pipe(map(data => data));
  }

  guardarPedido( pedido : Pedido) {
    const url_api = this.apiPedidos;
    return this.http.post<any>(url_api, pedido).pipe(map(data => data));
  }

  actualizarPedido( pedido : Pedido) {
    const url_api = this.apiPedidos;
    return this.http.put<any>(url_api, pedido).pipe(map(data => data));
  }
}
