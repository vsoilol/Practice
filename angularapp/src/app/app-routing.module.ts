import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('../app/features/user/user.module').then(m => m.UserModule),
  },
  {
    path: 'weatherforecast',
    loadChildren: () =>
      import('../app/features/weather-forecast/weather-forecast.module').then(
        m => m.WeatherForecastModule
      ),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('../app/features/student/student.module').then(
        m => m.StudentModule
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
