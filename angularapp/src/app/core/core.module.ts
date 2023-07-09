import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [HeaderComponent, NavbarComponent, SidebarComponent, SidenavComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, NavbarComponent, SidebarComponent],
})
export class CoreModule {}
