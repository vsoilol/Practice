import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from 'src/app/core/models/responses/student';
import { StudentService } from './student.service';

@Injectable()
export class StudentsDataSourceService extends DataSource<Student> {
  constructor(private studentService: StudentService) {
    super();
  }

  override connect(): Observable<readonly Student[]> {
    return this.studentService.students$.asObservable();
  }

  override disconnect(): void {
    /**/
  }
}
