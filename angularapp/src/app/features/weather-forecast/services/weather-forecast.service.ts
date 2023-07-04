import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherForecast } from '../models/weather-forecast';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastService {
  private baseUrl = '/api/weatherforecast';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(this.baseUrl);
  }
}
