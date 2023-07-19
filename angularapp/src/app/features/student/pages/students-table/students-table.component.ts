import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditStudentDialogComponent } from '../../dialogs/edit-student-dialog/edit-student-dialog.component';
import { Student } from 'src/app/core/models/responses/student';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectIsStudentLoading,
  selectStudents,
} from '../../store/selectors';
import { getAllStudentsAction } from '../../store/actions/getAllStudents.action';
import { deleteStudentAction } from '../../store/actions/deleteStudent.action';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent implements OnInit {
  public displayedColumns = [
    'firstName',
    'lastName',
    'middleName',
    'age',
    'group',
    'actions',
  ];
  students$!: Observable<Student[]>;
  isLoadingStudents$!: Observable<boolean>;

  constructor(
    public dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.store.dispatch(getAllStudentsAction());
  }

  initializeValues(): void {
    this.students$ = this.store.select(selectStudents);
    this.isLoadingStudents$ = this.store.select(selectIsStudentLoading);
  }

  addNew() {
    const dialogRef = this.dialog.open(EditStudentDialogComponent, {
      disableClose: true,
      data: null,
    });
  }

  startEdit(student: Student) {
    const dialogRef = this.dialog.open(EditStudentDialogComponent, {
      disableClose: true,
      data: student,
    });
  }

  deleteItem(id: string) {
    this.store.dispatch(deleteStudentAction({ id }));
  }
}
