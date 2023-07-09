import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/responses/user';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private baseUrl = '/api/user';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
}
