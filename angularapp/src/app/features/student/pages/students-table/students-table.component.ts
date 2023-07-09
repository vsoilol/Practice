import { Component, OnInit } from '@angular/core';
import { StudentsDataSourceService } from '../../services/students-data-source.service';
import { MatDialog } from '@angular/material/dialog';
import { EditStudentDialogComponent } from '../../dialogs/edit-student-dialog/edit-student-dialog.component';
import { StudentService } from '../../services/student.service';
import { Student } from 'src/app/core/models/responses/student';

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

  constructor(
    public studentService: StudentService,
    public dialog: MatDialog,
    public dataSource: StudentsDataSourceService
  ) {}

  ngOnInit(): void {
    this.studentService.loadStudents();
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
    this.studentService.deleteStudent(id);
  }
}
