import {Component, OnInit} from '@angular/core';
import {URL_REGISTER} from '../../share/utils/constantes';
import {LocalService} from '../../share/servicios/local-service.service';
import {UsuarioServiceService} from '../../share/servicios-rest/usuario-service.service';
import {ToastServiceService} from '../../share/servicios/toast-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public urlRegister = URL_REGISTER;
  public form: FormGroup;

  constructor(private localService: LocalService, private usuarioServiceService: UsuarioServiceService,
              public toastServiceService: ToastServiceService, private formBuilder: FormBuilder, private route: Router) {
    this.form = this.formBuilder.group({
      correo: [null, Validators.required],
      contrasena: [null, Validators.required]
    });
  }

  ngOnInit() {
    if (!!this.localService.getJsonValue('user_akatsuki')) {
      this.route.navigate(['/clientes']);
    }
  }

  public iniciarSesion() {
    if (this.form.valid) {
      this.usuarioServiceService.iniciarSesion(this.form.controls['correo'].value,
        this.form.controls['contrasena'].value).subscribe(data => {
        this.localService.setJsonValue('user_akatsuki', data.body);
        this.route.navigate(['/clientes']);
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
