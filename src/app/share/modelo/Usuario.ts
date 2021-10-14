import {Ciudad} from './Ciudad';

export class Usuario {
  id: number;
  correo: string;
  contrasena: string;
  fechaNacimiento: string;
  celular: string;
  tipo: string;
  nombre: string;
  fechaIngreso: Date;
  fkCiudadVendedor: number;
  fkAdministrador: number;
  ciudadVendedor: Ciudad;
  administrador: Usuario;
  nombreEmpresa: string;
  fkCiudadAdministrador: number;
  ciudadAdministrador: Ciudad;
}
