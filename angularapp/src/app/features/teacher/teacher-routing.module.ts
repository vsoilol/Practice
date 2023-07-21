import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersTableComponent } from './pages/teachers-table/teachers-table.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
