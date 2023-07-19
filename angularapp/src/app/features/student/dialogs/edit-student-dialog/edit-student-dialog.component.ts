import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/core/models/responses/student';
import { UpdateStudentRequest } from 'src/app/core/models/requests/student/updateStudentRequest';
import { CreateStudentRequest } from 'src/app/core/models/requests/student/createStudentRequest';
import { Store } from '@ngrx/store';
import { updateStudentAction } from '../../store/actions/updateStudent.action';
import { createStudentAction } from '../../store/actions/createStudent.action';

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.scss'],
})
export class EditStudentDialogComponent {
  public form: FormGroup;
  userIds: string[] = ['User1', 'User2', 'User3'];
  title: string;

  constructor(
    public dialogRef: MatDialogRef<EditStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public student: Student | null,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.title = `${student ? 'Обновление' : 'Создание'} студента`;
    this.form = this.getFormGroup();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    if (this.student) {
      this.updateStudent(this.student.id);
    }

    if (!this.student) {
      this.createStudent();
    }

    this.dialogRef.close();
  }

  private updateStudent(studentId: string): void {
    const request: UpdateStudentRequest = this.form
      .value as UpdateStudentRequest;
    request.id = studentId;
    this.store.dispatch(updateStudentAction({ request }));
  }

  private createStudent(): void {
    const request: CreateStudentRequest = this.form
      .value as CreateStudentRequest;
    this.store.dispatch(createStudentAction({ request }));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      firstName: [
        this.student?.firstName ?? '',
        Validators.compose([Validators.required]),
      ],
      lastName: [
        this.student?.lastName ?? '',
        Validators.compose([Validators.required]),
      ],
      middleName: [
        this.student?.middleName ?? '',
        Validators.compose([Validators.required]),
      ],
      age: [this.student?.age ?? 0, Validators.compose([Validators.required])],
      group: [
        this.student?.group ?? '',
        Validators.compose([Validators.required]),
      ],
    });
  }
}
