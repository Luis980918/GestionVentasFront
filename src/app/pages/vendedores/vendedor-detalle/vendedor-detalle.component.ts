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
  selector: 'app-vendedor-detalle',
  templateUrl: './vendedor-detalle.component.html',
  styleUrls: ['./vendedor-detalle.component.css']
})
export class VendedorDetalleComponent implements OnInit {
  @Input() esNuevo: boolean;
  @Input() idAdmin: number;
  @Input() vendedor: Usuario;
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
      nombre: this.vendedor.nombre,
      correo: this.vendedor.correo,
      fechaNacimiento: this.vendedor.fechaNacimiento ? new Date(this.vendedor.fechaNacimiento) : null,
      celular: this.vendedor.celular,
      ciudad: this.vendedor.ciudadVendedor,
    });
  }

  private consultarCiudades() {
    this.ciudadService.buscarTodasLasCiudades().subscribe(data => {
      if (data && data.body) {
        this.ciudades = data.body;
      }
    });
  }

  public crearVendedor() {
    if (this.form.invalid) {
      return;
    }
    this.vendedor.tipo = 'VENDEDOR';
    this.vendedor.fkAdministrador = this.idAdmin;
    this.vendedor.nombre = this.form.controls['nombre'].value;
    this.vendedor.correo = this.form.controls['correo'].value;
    this.vendedor.fechaNacimiento = this.form.controls['fechaNacimiento'].value ?
      moment(this.form.controls['fechaNacimiento'].value).format('YYYY-MM-DD') : null;
    this.vendedor.celular = this.form.controls['celular'].value;
    this.vendedor.fkCiudadVendedor = this.form.controls['ciudad'].value.id;
    if (this.esNuevo) {
      this.guardar();
    } else {
      this.actualizar();
    }
  }

  public guardar() {
    this.usuarioServiceService.guardarUsuario(this.vendedor).subscribe(data => {
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
    this.usuarioServiceService.actualizarUsuario(this.vendedor).subscribe(data => {
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
