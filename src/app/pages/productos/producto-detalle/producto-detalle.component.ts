import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductoService} from '../../../share/servicios-rest/producto.service';
import {Producto} from '../../../share/modelo/Producto';
import {ToastServiceService} from '../../../share/servicios/toast-service.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  @Input() esNuevo: any;
  @Input() idAdmin: number;
  @Output() recargarDatos: EventEmitter<boolean> = new EventEmitter<boolean>();
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private productoService: ProductoService,
              public toastServiceService: ToastServiceService) {
    this.form = this.formBuilder.group({
      nombre: [null, Validators.required],
      costo: [null, [Validators.required, Validators.email]],
      observacion: [null],
      disponible: [true],
      administrador: [null],
    });
  }

  ngOnInit(): void {
  }

  crearProducto() {
    let productoSave = new Producto();
    productoSave.nombre = this.form.controls.nombre.value;
    productoSave.costo = this.form.controls.costo.value;
    productoSave.observacion = this.form.controls.observacion.value;
    productoSave.disponible = this.form.controls.disponible.value;
    productoSave.fkAdministrador = this.idAdmin;
    this.productoService.guardarProducto(productoSave).subscribe(data => {
      console.log(data);
      this.toastServiceService.addSingle('success', 'Respuesta', data.message);
      this.recargarDatos.emit(true);
    }, error => {
      if (error.status === 0) {
        this.toastServiceService.addSingle('error', 'ERROR:', 'Los servicios no están disponibles');
      } else {
        this.toastServiceService.addSingle('error', 'ERROR:', error.error.message);
      }
    });
  }
}
