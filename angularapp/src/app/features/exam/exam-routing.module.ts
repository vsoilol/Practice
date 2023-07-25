import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamsTableComponent } from './pages/exams-table/exams-table.component';

const routes: Routes = [
  {
    path: '',
    component: ExamsTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
