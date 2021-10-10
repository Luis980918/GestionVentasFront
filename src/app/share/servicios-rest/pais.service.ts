import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StandardResponse} from '../utils/standard-response.interface';

const urlBase = environment.urlAPI;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) {
  }

  public buscarTodosLosPaises(): Observable<StandardResponse> {
    return this.http.get(`${urlBase}pais`, httpOptions);
  }
}
