import { Component } from '@angular/core';
import { NavigationItem } from './models/NavigationItem';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public routes: NavigationItem[] = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: 'Студенты',
      link: '/student',
    }
  ];
}
