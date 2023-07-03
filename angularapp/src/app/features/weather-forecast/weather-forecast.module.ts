import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherForecastRoutingModule } from './weather-forecast-routing.module';
import { WeatherForecastListComponent } from './pages/weather-forecast-list/weather-forecast-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WeatherForecastListComponent
  ],
  imports: [
    CommonModule,
    WeatherForecastRoutingModule,
    SharedModule
  ]
})
export class WeatherForecastModule { }
