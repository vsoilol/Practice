import { Component } from '@angular/core';
import { NavBarItem } from './models/nav-bar-item';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  navData: NavBarItem[] = [
    {
      label: 'Студенты',
      routeLink: '/student',
    },
  ];
}
