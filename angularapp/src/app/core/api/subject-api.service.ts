import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/responses/subject';
import { CreateSubjectRequest } from '../models/requests/subject/createSubjectRequest';
import { UpdateSubjectRequest } from '../models/requests/subject/updateSubjectRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectApiService {
  private baseUrl = '/api/subject';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.baseUrl);
  }

  public create(request: CreateSubjectRequest): Observable<Subject> {
    return this.http.post<Subject>(this.baseUrl, request);
  }

  public update(request: UpdateSubjectRequest): Observable<void> {
    return this.http.put<void>(this.baseUrl, request);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
