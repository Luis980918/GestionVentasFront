import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Departamento} from '../../../share/modelo/Departamento';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastServiceService} from '../../../share/servicios/toast-service.service';
import {PaisService} from '../../../share/servicios-rest/pais.service';
import {Pais} from '../../../share/modelo/Pais';
import {DepartamentoService} from '../../../share/servicios-rest/departamento.service';

@Component({
  selector: 'app-departamento-detalle',
  templateUrl: './departamento-detalle.component.html',
  styleUrls: ['./departamento-detalle.component.css']
})
export class DepartamentoDetalleComponent implements OnInit {
  @Input() esNuevo: boolean;
  @Input() departamento: Departamento;
  @Output() recargarDatos: EventEmitter<boolean> = new EventEmitter<boolean>();
  public form: FormGroup;
  public paises: Pais[] = [];

  constructor(private formBuilder: FormBuilder, private departamentoService: DepartamentoService,
              public toastServiceService: ToastServiceService, private paisService: PaisService) {
    this.form = this.formBuilder.group({
      nombre: [null, Validators.required],
      nombreCorto: [null],
      habilitado: [false],
      pais: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (!this.esNuevo) {
      this.asignarInformacion();
    }
    this.consultarPaises();
  }

  private asignarInformacion() {
    this.form.setValue({
      nombre: this.departamento.nombre,
      nombreCorto: this.departamento.nombreCorto,
      habilitado: this.departamento.habilitado,
      pais: this.departamento.pais,
    });
  }

  private consultarPaises() {
    this.paisService.buscarTodosLosPaises().subscribe(data => {
      if (data && data.body) {
        this.paises = data.body;
      }
    });
  }

  public crearDepartamento() {
    if (this.form.invalid) {
      return;
    }
    this.departamento.nombre = this.form.controls['nombre'].value;
    this.departamento.nombreCorto = this.form.controls['nombreCorto'].value;
    this.departamento.habilitado = this.form.controls['habilitado'].value;
    this.departamento.fkPais = this.form.controls['pais'].value.id;
    if (this.esNuevo) {
      this.guardar();
    } else {
      this.actualizar();
    }
  }

  public guardar() {
    this.departamentoService.guardarDepartamento(this.departamento).subscribe(data => {
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
    this.departamentoService.actualizarDepartamento(this.departamento).subscribe(data => {
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
