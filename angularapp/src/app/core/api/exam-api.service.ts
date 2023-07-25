import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CreateExamRequest } from '../models/requests/exam/createExamRequest';
import { UpdateExamRequest } from '../models/requests/exam/updateExamRequest';
import { Exam, ExamBackend } from '../models/responses/exam';

@Injectable({
  providedIn: 'root',
})
export class ExamApiService {
  private baseUrl = '/api/exam';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Exam[]> {
    return this.http
      .get<ExamBackend[]>(this.baseUrl)
      .pipe(map(exams => exams.map(this.mapExam)));
  }

  public create(request: CreateExamRequest): Observable<Exam> {
    return this.http
      .post<ExamBackend>(this.baseUrl, request)
      .pipe(map(this.mapExam));
  }

  public update(request: UpdateExamRequest): Observable<void> {
    return this.http.put<void>(this.baseUrl, request);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private mapExam(exam: ExamBackend): Exam {
    const result: Exam = {
      id: exam.id,
      date: new Date(exam.date),
      teacher: exam.teacher,
      subject: exam.subject,
    };
    return result;
  }
}
