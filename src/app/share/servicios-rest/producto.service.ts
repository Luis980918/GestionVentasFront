import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../modelo/Usuario';
import {Observable} from 'rxjs';
import {StandardResponse} from '../utils/standard-response.interface';
import {Producto} from '../modelo/Producto';

const urlBase = environment.urlAPI;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  public guardarProducto(producto: Producto): Observable<StandardResponse> {
    return this.http.post(urlBase.concat('productos'), producto, httpOptions);
  }

  public buscarTodosLosProductos(idAdmin: any): Observable<StandardResponse> {
    return this.http.get(`${urlBase}productos/buscar-todos/${idAdmin}`, httpOptions);
  }
}
