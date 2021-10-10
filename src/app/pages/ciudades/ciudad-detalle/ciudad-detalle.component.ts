import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Departamento} from '../../../share/modelo/Departamento';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepartamentoService} from '../../../share/servicios-rest/departamento.service';
import {ToastServiceService} from '../../../share/servicios/toast-service.service';
import {CiudadService} from '../../../share/servicios-rest/ciudad.service';
import {Ciudad} from '../../../share/modelo/Ciudad';

@Component({
  selector: 'app-ciudad-detalle',
  templateUrl: './ciudad-detalle.component.html',
  styleUrls: ['./ciudad-detalle.component.css']
})
export class CiudadDetalleComponent implements OnInit {
  @Input() esNuevo: boolean;
  @Input() ciudad: Ciudad;
  @Output() recargarDatos: EventEmitter<boolean> = new EventEmitter<boolean>();
  public form: FormGroup;
  public departamentos: Departamento[] = [];

  constructor(private formBuilder: FormBuilder, private ciudadService: CiudadService,
              public toastServiceService: ToastServiceService,
              private departamentoService: DepartamentoService) {
    this.form = this.formBuilder.group({
      nombre: [null, Validators.required],
      nombreCorto: [null],
      habilitado: [false],
      departamento: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (!this.esNuevo) {
      this.asignarInformacion();
    }
    this.consultarDepartamentos();
  }

  private asignarInformacion() {
    this.form.setValue({
      nombre: this.ciudad.nombre,
      nombreCorto: this.ciudad.nombreCorto,
      habilitado: this.ciudad.habilitado,
      departamento: this.ciudad.departamento,
    });
  }

  private consultarDepartamentos() {
    this.departamentoService.buscarTodosLosDepartamentos().subscribe(data => {
      if (data && data.body) {
        this.departamentos = data.body;
      }
    });
  }

  public crearCiudad() {
    if (this.form.invalid) {
      return;
    }
    this.ciudad.nombre = this.form.controls['nombre'].value;
    this.ciudad.nombreCorto = this.form.controls['nombreCorto'].value;
    this.ciudad.habilitado = this.form.controls['habilitado'].value;
    this.ciudad.fkDepartamento = this.form.controls['departamento'].value.id;
    if (this.esNuevo) {
      this.guardar();
    } else {
      this.actualizar();
    }
  }

  public guardar() {
    this.ciudadService.guardarCiudad(this.ciudad).subscribe(data => {
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
    this.ciudadService.actualizarCiudad(this.ciudad).subscribe(data => {
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
