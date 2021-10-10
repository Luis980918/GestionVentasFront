import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {calendarEs} from '../../../share/utils/commons';
import * as moment from 'moment';
import {Ciudad} from '../../../share/modelo/Ciudad';
import {CiudadService} from '../../../share/servicios-rest/ciudad.service';
import {Usuario} from '../../../share/modelo/Usuario';
import {UsuarioServiceService} from '../../../share/servicios-rest/usuario-service.service';
import {ToastServiceService} from '../../../share/servicios/toast-service.service';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css']
})
export class ClienteDetalleComponent implements OnInit {
  @Input() esNuevo: boolean;
  @Input() idAdmin: number;
  @Input() cliente: Usuario;
  @Output() recargarDatos: EventEmitter<boolean> = new EventEmitter<boolean>();
  public form: FormGroup;
  public es = calendarEs;
  public anoActual = new Date().getFullYear();
  public anoAntes = new Date().getFullYear() - 50;
  public maxDate = new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'));
  public minDate = new Date(moment(new Date()).subtract(50, 'years').format('YYYY-MM-DD'));
  public ciudades: Ciudad[] = [];

  constructor(private formBuilder: FormBuilder, private ciudadService: CiudadService,
              private usuarioServiceService: UsuarioServiceService, public toastServiceService: ToastServiceService) {
    this.form = this.formBuilder.group({
      nombre: [null, Validators.required],
      correo: [null, [Validators.required, Validators.email]],
      fechaNacimiento: [null],
      celular: [null],
      ciudad: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (!this.esNuevo) {
      this.asignarInformacion();
    }
    this.consultarCiudades();
  }

  private asignarInformacion() {
    this.form.setValue({
      nombre: this.cliente.nombre,
      correo: this.cliente.correo,
      fechaNacimiento: this.cliente.fechaNacimiento ? new Date(this.cliente.fechaNacimiento) : null,
      celular: this.cliente.celular,
      ciudad: this.cliente.ciudadCliente,
    });
  }

  private consultarCiudades() {
    this.ciudadService.buscarTodasLasCiudades().subscribe(data => {
      if (data && data.body) {
        this.ciudades = data.body;
      }
    });
  }

  public crearCliente() {
    if (this.form.invalid) {
      return;
    }
    this.cliente.tipo = 'CLIENTE';
    this.cliente.fkAdministrador = this.idAdmin;
    this.cliente.nombre = this.form.controls['nombre'].value;
    this.cliente.correo = this.form.controls['correo'].value;
    this.cliente.fechaNacimiento = this.form.controls['fechaNacimiento'].value ?
      moment(this.form.controls['fechaNacimiento'].value).format('YYYY-MM-DD') : null;
    this.cliente.celular = this.form.controls['celular'].value;
    this.cliente.fkCiudadCliente = this.form.controls['ciudad'].value.id;
    if (this.esNuevo) {
      this.guardar();
    } else {
      this.actualizar();
    }
  }

  public guardar() {
    this.usuarioServiceService.guardarUsuario(this.cliente).subscribe(data => {
      this.recargarDatos.emit(true);
      this.toastServiceService.addSingle('success', 'Respuesta', data.message);
    }, error => {
      if (error.status === 0) {
        this.toastServiceService.addSingle('error', 'ERROR:', 'Los servicios no están disponibles');
      } else {
        this.toastServiceService.addSingle('error', 'ERROR:', error.error.message);
      }
    });
  }

  public actualizar() {
    this.usuarioServiceService.actualizarUsuario(this.cliente).subscribe(data => {
      this.recargarDatos.emit(true);
      this.toastServiceService.addSingle('success', 'Respuesta', data.message);
    }, error => {
      if (error.status === 0) {
        this.toastServiceService.addSingle('error', 'ERROR:', 'Los servicios no están disponibles');
      } else {
        this.toastServiceService.addSingle('error', 'ERROR:', error.error.message);
      }
    });
  }

}
