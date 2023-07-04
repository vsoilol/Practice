import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from '../../services/weather-forecast.service';
import { WeatherForecast } from '../../models/weather-forecast';

@Component({
  selector: 'app-weather-forecast-list',
  templateUrl: './weather-forecast-list.component.html',
  styleUrls: ['./weather-forecast-list.component.scss'],
})
export class WeatherForecastListComponent implements OnInit {
  forecastTableColumns: string[] = [
    'date',
    'temperatureC',
    'temperatureF',
    'summary',
  ];
  public forecasts: WeatherForecast[] = [];

  constructor(private weatherForecastService: WeatherForecastService) {}

  ngOnInit(): void {
    this.weatherForecastService.getAll().subscribe(
      result => {
        this.forecasts = result;
      },
      error => console.error(error)
    );
  }
}
