import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StudentApiService } from 'src/app/core/api/student-api.service';
import { UserApiService } from 'src/app/core/api/user-api.service';
import { CreateStudentRequest } from 'src/app/core/models/requests/student/createStudentRequest';
import { UpdateStudentRequest } from 'src/app/core/models/requests/student/updateStudentRequest';
import { Student } from 'src/app/core/models/responses/student';
import { User } from 'src/app/core/models/responses/user';

@Injectable()
export class StudentService {
  students$ = new BehaviorSubject<Student[]>([]);
  users$ = new BehaviorSubject<User[]>([]);

  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private studentApiService: StudentApiService,
    private userApiService: UserApiService
  ) {}

  public loadStudents(): void {
    this.isLoading$.next(true);
    this.studentApiService.getAll().subscribe(students => {
      this.students$.next(students);
      this.isLoading$.next(false);
    });
  }

  public loadUsers(): void {
    this.isLoading$.next(true);
    this.userApiService.getAll().subscribe(users => {
      this.users$.next(users);
      this.isLoading$.next(false);
    });
  }

  public addStudent(addStudentRequest: CreateStudentRequest): void {
    this.isLoading$.next(true);
    this.studentApiService.create(addStudentRequest).subscribe(() => {
      this.isLoading$.next(false);
      this.loadStudents();
    });
  }

  public deleteStudent(id: string): void {
    this.isLoading$.next(true);
    this.studentApiService.delete(id).subscribe(() => {
      this.isLoading$.next(false);
      this.loadStudents();
    });
  }

  public updateStudent(updateStudentRequest: UpdateStudentRequest): void {
    this.isLoading$.next(true);
    this.studentApiService.update(updateStudentRequest).subscribe(() => {
      this.isLoading$.next(false);
      this.loadStudents();
    });
  }
}
