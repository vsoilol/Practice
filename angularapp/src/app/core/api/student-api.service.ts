import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateStudentRequest } from '../models/requests/student/createStudentRequest';
import { UpdateStudentRequest } from '../models/requests/student/updateStudentRequest';
import { Student } from '../models/responses/student';

@Injectable({
  providedIn: 'root',
})
export class StudentApiService {
  private baseUrl = '/api/student';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  public create(student: CreateStudentRequest): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, student);
  }

  public update(student: UpdateStudentRequest): Observable<void> {
    return this.http.put<void>(this.baseUrl, student);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
