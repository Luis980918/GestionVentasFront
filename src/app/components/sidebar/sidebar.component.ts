import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalService} from '../../share/servicios/local-service.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/clientes', title: 'Clientes', icon: 'fas fa-address-book', class: ''},
  {path: '/productos', title: 'Productos', icon: 'fas fa-leaf', class: ''},
  {path: '/departamentos', title: 'Departamentos', icon: 'fas fa-flag', class: ''},
  {path: '/ciudades', title: 'Ciudades', icon: 'fas fa-city', class: ''},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

}
