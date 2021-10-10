import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../../share/modelo/Usuario';
import {UsuarioServiceService} from '../../share/servicios-rest/usuario-service.service';
import {Router} from '@angular/router';
import {URL_LOGIN, USUARIO_TIPO_ADMINISTRADOR} from '../../share/utils/constantes';
import {ToastServiceService} from '../../share/servicios/toast-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public urlLogin = URL_LOGIN;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioServiceService: UsuarioServiceService,
              private route: Router, public toastServiceService: ToastServiceService) {
    this.form = this.formBuilder.group({
      nombre: [null, Validators.required],
      correo: [null, [Validators.required, Validators.email]],
      contrasena: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  public guardarInformacion() {
    if (this.form.valid) {
      const usuario = new Usuario();
      usuario.nombre = this.form.controls['nombre'].value;
      usuario.correo = this.form.controls['correo'].value;
      usuario.contrasena = this.form.controls['contrasena'].value;
      usuario.tipo = USUARIO_TIPO_ADMINISTRADOR;
      this.usuarioServiceService.guardarUsuario(usuario).subscribe(data => {
        this.toastServiceService.addSingle('success', 'Respuesta', data.message);
        this.route.navigate(['/login']);
      }, error => {
        if (error.status === 0) {
          this.toastServiceService.addSingle('error', 'ERROR:', 'Los servicios no están disponibles');
        } else {
          this.toastServiceService.addSingle('error', 'ERROR:', error.error.message);
        }
      });
    }
  }
}
