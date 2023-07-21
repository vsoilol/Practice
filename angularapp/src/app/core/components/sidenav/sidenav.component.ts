import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavBarItem } from './models/nav-bar-item';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  navData: NavBarItem[] = [
    {
      label: 'Студенты',
      routeLink: '/student',
    },
    {
      label: 'Преподаватели',
      routeLink: '/teacher',
    },
    {
      label: 'Дисциплины',
      routeLink: '/subject',
    },
  ];
}
