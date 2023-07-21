import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WorkingDay, WorkingDayBackend } from '../models/responses/workingDay';

@Injectable({
  providedIn: 'root',
})
export class WorkingDayApiService {
  private baseUrl = '/api/workingDay';

  constructor(
    private http: HttpClient
  ) {}

  public getAllDaysByTeacherId(teacherId: string): Observable<WorkingDay[]> {
    return this.http
      .get<WorkingDayBackend[]>(`${this.baseUrl}/${teacherId}`)
      .pipe(map(workingDays => workingDays.map(this.mapWorkingDay)));
  }

  private mapWorkingDay(workingDay: WorkingDayBackend): WorkingDay {
    const result: WorkingDay = {
      id: workingDay.id,
      date: new Date(workingDay.date),
    };
    return result;
  }
}
