import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../share/modelo/Usuario';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {UsuarioServiceService} from '../../share/servicios-rest/usuario-service.service';
import {LocalService} from '../../share/servicios/local-service.service';
import {ToastServiceService} from '../../share/servicios/toast-service.service';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css']
})
export class VendedorComponent implements OnInit {
  public selectedColumns = [
    {field: 'nombre', header: 'Nombre', width: '150px'},
    {field: 'correo', header: 'Correo', width: '150px'},
    {field: 'fechaNacimiento', header: 'Fecha nacimiento', width: '150px'},
    {field: 'celular', header: 'Celular', width: '150px'},
    {field: 'fechaIngreso', header: 'Fecha ingreso', width: '150px'},
    {field: 'ciudadVendedor.nombre', header: 'Ciudad', width: '150px'},
    {field: 'ciudadVendedor.departamento.nombre', header: 'Departamento', width: '150px'},
    {field: 'ciudadVendedor.departamento.pais.nombre', header: 'Pais', width: '110px'},
  ];
  public vendedores: Usuario[] = [];
  public page = 0;
  public size = 20;
  public first = 1;
  public totalRecords = 0;
  private esprimeraConsulta = false;
  public sort: string;
  public idAdmin: number;
  public esNuevo = false;
  public habilitarVentana = false;
  public vendedorActualizar: Usuario = new Usuario();
  public nombre: string;
  public correo: string;

  constructor(private usuarioServiceService: UsuarioServiceService,
              private localService: LocalService, public toastServiceService: ToastServiceService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    const user: Usuario = this.localService.getJsonValue('user_akatsuki');
    this.idAdmin = user.id;
    this.consultarVendedores();
  }

  public loadRecordsLazy(event: LazyLoadEvent) {
    this.size = event.rows;
    this.page = Math.floor(event.first / this.size);
    if (event.sortField) {
      this.sort = event.sortField;
      if (event.sortOrder) {
        this.sort += ',' + (event.sortOrder === 1 ? 'asc' : 'desc');
      } else {
        this.sort += ',asc';
      }
    }
    if (!this.esprimeraConsulta) {
      this.esprimeraConsulta = true;
      return;
    }
    this.consultarVendedores();
  }

  public consultarVendedores() {
    this.usuarioServiceService.buscarUsuarioPorAdmin(this.idAdmin, this.nombre, this.correo,
      this.page, this.size, this.sort).subscribe(data => {
      if (data && data.body && data.body.content) {
        this.totalRecords = data.body.totalElements;
        this.vendedores = data.body.content;
      }
    });
  }

  public crearVededor() {
    this.esNuevo = true;
    this.habilitarVentana = true;
  }

  public cerrarVentana(recargar?: boolean) {
    this.vendedorActualizar = new Usuario();
    if (recargar) {
      this.consultarVendedores();
    }
    this.habilitarVentana = false;
  }

  private eliminarVendedor(usuario: Usuario) {
    this.usuarioServiceService.eliminarUsuario(usuario.id).subscribe(data => {
      if (data && data.status === 0) {
        this.toastServiceService.addSingle('success', 'Respuesta', data.message);
        this.consultarVendedores();
      }
    }, error => {
      if (error.status === 0) {
        this.toastServiceService.addSingle('error', 'ERROR:', 'Los servicios no están disponibles');
      } else {
        this.toastServiceService.addSingle('error', 'ERROR:', error.error.message);
      }
    });
  }

  public editarVendedor(usuario: Usuario) {
    this.vendedorActualizar = usuario;
    this.esNuevo = false;
    this.habilitarVentana = true;
  }

  public limpiarYConsultar() {
    this.page = 0;
    this.size = 20;
    this.first = 1;
    this.totalRecords = 0;
    this.nombre = null;
    this.correo = null;
    this.consultarVendedores();
  }

  public confirmarEliminar(event: Event, usuario: Usuario) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Desea eliminar el vededor?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarVendedor(usuario);
      }
    });
  }
}
