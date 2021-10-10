import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Usuario} from '../modelo/Usuario';
import {Observable} from 'rxjs';
import {StandardResponse} from '../utils/standard-response.interface';

const urlBase = environment.urlAPI;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private http: HttpClient) {
  }

  public guardarUsuario(usuario: Usuario): Observable<StandardResponse> {

    return this.http.post(urlBase.concat('usuarios'), usuario, httpOptions);
  }

  public actualizarUsuario(usuario: Usuario): Observable<StandardResponse> {
    return this.http.put(urlBase.concat('usuarios'), usuario, httpOptions);
  }

  public iniciarSesion(correo: string, contrasena: string): Observable<StandardResponse> {
    return this.http.get(`${urlBase}usuarios/iniciar-sesion/${correo}/${contrasena}`, httpOptions);
  }

  public buscarUsuarioPorAdmin(idAdministrador: number, nombre: string, correo: string, page: number, size: number, sort: string): Observable<StandardResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams().set('page', String(page)).set('size', String(size))
      .set('sort', sort ? sort : 'id,desc').set('idAdministrador', String(idAdministrador));
    if (nombre) {
      params = params.set('nombre', nombre);
    }
    if (correo) {
      params = params.set('correo', correo);
    }
    return this.http.get(`${urlBase}usuarios/filtro-administrador`, {headers: headers, params: params});
  }

  public eliminarUsuario(idUsuario: number): Observable<StandardResponse> {
    return this.http.delete(urlBase.concat('usuarios/').concat(idUsuario.toString()), httpOptions);
  }
}
