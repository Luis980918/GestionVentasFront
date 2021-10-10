import {Component, OnInit} from '@angular/core';
import {Departamento} from '../../share/modelo/Departamento';
import {DepartamentoService} from '../../share/servicios-rest/departamento.service';
import {ConfirmationService} from 'primeng/api';
import {ToastServiceService} from '../../share/servicios/toast-service.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  public selectedColumns = [
    {field: 'nombre', header: 'Nombre', width: '150px'},
    {field: 'nombreCorto', header: 'Nombre corto', width: '150px'},
    {field: 'habilitado', header: 'Habilitado', width: '150px'},
    {field: 'pais', header: 'Pais', width: '150px'},
  ];
  public departamentos: Departamento[] = [];
  public size = 20;
  public totalRecords = 0;
  public departamento: Departamento = new Departamento();
  public esNuevo: boolean;
  public habilitarVentana = false;

  constructor(private departamentoService: DepartamentoService,
              private confirmationService: ConfirmationService,
              public toastServiceService: ToastServiceService) {
  }

  ngOnInit(): void {
    this.consultarDepartamentos();
  }

  public consultarDepartamentos() {
    this.departamentoService.buscarTodosLosDepartamentos().subscribe(data => {
      if (data && data.body) {
        this.departamentos = data.body;
      }
    });
  }

  public editarDepartamento(departamaento: Departamento) {
    this.departamento = departamaento;
    this.esNuevo = false;
    this.habilitarVentana = true;
  }

  public confirmarEliminar(event: Event, departamento: Departamento) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Desea eliminar el departamento?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarDepartamento(departamento);
      }
    });
  }

  private eliminarDepartamento(departamento: Departamento) {
    this.departamentoService.eliminarDepartamento(departamento.id).subscribe(data => {
      if (data && data.status === 0) {
        this.toastServiceService.addSingle('success', 'Respuesta', data.message);
        this.consultarDepartamentos();
      }
    }, error => {
      if (error.status === 0) {
        this.toastServiceService.addSingle('error', 'ERROR:', 'Los servicios no están disponibles');
      } else {
        this.toastServiceService.addSingle('error', 'ERROR:', error.error.message);
      }
    });
  }

  public crearDepartamento() {
    this.habilitarVentana = true;
    this.esNuevo = true;
  }

  public cerrarVentana(recargarDatos?: boolean) {
    if (recargarDatos) {
      this.consultarDepartamentos();
    }
    this.habilitarVentana = false;
  }
}
