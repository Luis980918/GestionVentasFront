import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StandardResponse} from '../utils/standard-response.interface';
import {Departamento} from '../modelo/Departamento';

const urlBase = environment.urlAPI;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) {
  }

  public buscarTodosLosDepartamentos(): Observable<StandardResponse> {
    return this.http.get(`${urlBase}departamento`, httpOptions);
  }

  public guardarDepartamento(departamento: Departamento): Observable<StandardResponse> {
    return this.http.post(urlBase.concat('departamento'), departamento, httpOptions);
  }

  public actualizarDepartamento(departamento: Departamento): Observable<StandardResponse> {
    return this.http.put(urlBase.concat('departamento'), departamento, httpOptions);
  }

  public eliminarDepartamento(idDepartamento: number): Observable<StandardResponse> {
    return this.http.delete(urlBase.concat('departamento/').concat(idDepartamento.toString()), httpOptions);
  }
}
