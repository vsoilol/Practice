import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsTableComponent } from './pages/students-table/students-table.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
