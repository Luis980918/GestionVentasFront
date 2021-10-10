import {Component, OnInit} from '@angular/core';
import {Producto} from '../../share/modelo/Producto';
import {Usuario} from '../../share/modelo/Usuario';
import {LocalService} from '../../share/servicios/local-service.service';
import {ProductoService} from '../../share/servicios-rest/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  totalRecords: number;
  first: number;
  size: number;
  selectedColumns: any;
  esNuevo: boolean;
  habilitarVentana = false;
  public idAdmin: number;

  constructor(private localService: LocalService,
              private productosService: ProductoService) {
  }

  ngOnInit(): void {
    const user: Usuario = this.localService.getJsonValue('user_akatsuki');
    this.idAdmin = user.id;
    this.consultarProductos();
  }

  loadRecordsLazy(event: any) {

  }

  crearProducto() {
    this.habilitarVentana = true;
    this.esNuevo = true;
  }

  limpiarYConsultar() {
    this.consultarProductos();
  }

  editarProducto(rowData: any) {
    this.habilitarVentana = true;
    this.esNuevo = false;
  }

  confirmarEliminar(event: MouseEvent, rowData: any) {

  }

  cerrarVentana(recargar?: boolean) {
    this.habilitarVentana = false;
    if (recargar) {
      this.consultarProductos();
    }
  }

  private consultarProductos() {
    const user: Usuario = this.localService.getJsonValue('user_akatsuki');
    this.idAdmin = user.id;
    this.productosService.buscarTodosLosProductos(user.id).subscribe(data => {
      if (data && data.body) {
        this.productos = data.body;
        this.totalRecords = data.body.length;
      }
    });
  }
}
