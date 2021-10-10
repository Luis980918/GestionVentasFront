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
  fkCiudadCliente: number;
  fkAdministrador: number;
  ciudadCliente: Ciudad;
  administrador: Usuario;
  nombreEmpresa: string;
  fkCiudadAdministrador: number;
  ciudadAdministrador: Ciudad;
}
