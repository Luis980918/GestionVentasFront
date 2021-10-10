import {Departamento} from './Departamento';

export class Ciudad {
  id: number;
  nombre: string;
  nombreCorto: string;
  habilitado: boolean;
  fkDepartamento: number;
  departamento: Departamento;
}
