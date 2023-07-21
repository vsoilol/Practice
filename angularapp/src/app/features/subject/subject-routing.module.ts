import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsTableComponent } from './pages/subjects-table/subjects-table.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectsTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
