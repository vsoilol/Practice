import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'student',
    loadChildren: () =>
      import('../app/features/student/student.module').then(
        m => m.StudentModule
      ),
  },
  {
    path: 'teacher',
    loadChildren: () =>
      import('../app/features/teacher/teacher.module').then(
        m => m.TeacherModule
      ),
  },
  {
    path: '',
    redirectTo: 'student',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
