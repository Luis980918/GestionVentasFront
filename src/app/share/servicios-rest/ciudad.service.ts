import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StandardResponse} from '../utils/standard-response.interface';
import {Ciudad} from '../modelo/Ciudad';

const urlBase = environment.urlAPI;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(private http: HttpClient) {
  }

  public buscarTodasLasCiudades(): Observable<StandardResponse> {
    return this.http.get(`${urlBase}ciudad`, httpOptions);
  }

  public guardarCiudad(ciudad: Ciudad): Observable<StandardResponse> {
    return this.http.post(urlBase.concat('ciudad'), ciudad, httpOptions);
  }

  public actualizarCiudad(ciudad: Ciudad): Observable<StandardResponse> {
    return this.http.put(urlBase.concat('ciudad'), ciudad, httpOptions);
  }

  public eliminarCiudad(idCiudad: number): Observable<StandardResponse> {
    return this.http.delete(urlBase.concat('ciudad/').concat(idCiudad.toString()), httpOptions);
  }
}
