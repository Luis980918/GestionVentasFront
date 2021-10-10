import {Component, ElementRef, OnInit} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {LocalService} from '../../share/servicios/local-service.service';
import {Usuario} from '../../share/modelo/Usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public userName = 'Usuario';

  constructor(location: Location, private element: ElementRef, private router: Router,
              private localService: LocalService) {
    this.location = location;
  }

  ngOnInit() {
    const user: Usuario = this.localService.getJsonValue('user_akatsuki');
    if (!!user) {
      this.userName = user.nombre.replace(/(.{1,16})(.*)/g, '$1...');
    }
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  public logout() {
    this.localService.clearToken();
    this.router.navigate(['/login']);
  }

}
