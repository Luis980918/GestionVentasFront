import {Pais} from './Pais';

export class Departamento {
  id: number;
  nombre: string;
  nombreCorto: string;
  habilitado: boolean;
  fkPais: number;
  pais: Pais;
}
