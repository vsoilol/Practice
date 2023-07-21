import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersTableComponent } from './pages/teachers-table/teachers-table.component';
import { TeacherCalendarComponent } from './pages/teacher-calendar/teacher-calendar.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersTableComponent,
  },
  { path: 'calendar/:teacherId', component: TeacherCalendarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
