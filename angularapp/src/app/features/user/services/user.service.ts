import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "/api/user";

  constructor(private http: HttpClient) { }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
}
