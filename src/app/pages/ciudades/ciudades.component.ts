import {Component, OnInit} from '@angular/core';
import {Departamento} from '../../share/modelo/Departamento';
import {Ciudad} from '../../share/modelo/Ciudad';
import {ConfirmationService} from 'primeng/api';
import {CiudadService} from '../../share/servicios-rest/ciudad.service';
import {ToastServiceService} from '../../share/servicios/toast-service.service';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {
  public selectedColumns = [
    {field: 'nombre', header: 'Nombre', width: '150px'},
    {field: 'nombreCorto', header: 'Nombre corto', width: '150px'},
    {field: 'habilitado', header: 'Habilitado', width: '150px'},
    {field: 'departamento', header: 'Pais', width: '150px'},
  ];
  public ciudades: Departamento[] = [];
  public size = 20;
  public totalRecords = 0;
  public ciudad: Ciudad = new Ciudad();
  public esNuevo: boolean;
  public habilitarVentana = false;

  constructor(private ciudadService: CiudadService,
              private confirmationService: ConfirmationService,
              public toastServiceService: ToastServiceService) {
  }

  ngOnInit(): void {
    this.consultarCiudades();
  }

  private consultarCiudades() {
    this.ciudadService.buscarTodasLasCiudades().subscribe(data => {
      if (data && data.body) {
        this.ciudades = data.body;
      }
    });
  }

  public editarCiudad(ciudad: Ciudad) {
    this.ciudad = ciudad;
    this.esNuevo = false;
    this.habilitarVentana = true;
  }

  public confirmarEliminar(event: Event, ciudad: Ciudad) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Desea eliminar el departamento?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarCiudad(ciudad);
      }
    });
  }

  private eliminarCiudad(ciudad: Ciudad) {
    this.ciudadService.eliminarCiudad(ciudad.id).subscribe(data => {
      if (data && data.status === 0) {
        this.toastServiceService.addSingle('success', 'Respuesta', data.message);
        this.consultarCiudades();
      }
    }, error => {
      if (error.status === 0) {
        this.toastServiceService.addSingle('error', 'ERROR:', 'Los servicios no están disponibles');
      } else {
        this.toastServiceService.addSingle('error', 'ERROR:', error.error.message);
      }
    });
  }

  public crearCiudad() {
    this.habilitarVentana = true;
    this.esNuevo = true;
  }

  public cerrarVentana(recargarDatos?: boolean) {
    if (recargarDatos) {
      this.consultarCiudades();
    }
    this.habilitarVentana = false;
  }
}
