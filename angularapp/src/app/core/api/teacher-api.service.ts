import { Injectable } from '@angular/core';
import { UpdateTeacherRequest } from '../models/requests/teacher/updateTeacherRequest';
import { CreateTeacherRequest } from '../models/requests/teacher/createTeacherRequest';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../models/responses/teacher';

@Injectable({
  providedIn: 'root',
})
export class TeacherApiService {
  private baseUrl = '/api/teacher';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.baseUrl);
  }

  public create(request: CreateTeacherRequest): Observable<Teacher> {
    return this.http.post<Teacher>(this.baseUrl, request);
  }

  public update(request: UpdateTeacherRequest): Observable<void> {
    return this.http.put<void>(this.baseUrl, request);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
