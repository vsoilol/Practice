import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/core/models/responses/student';
import { UpdateStudentRequest } from 'src/app/core/models/requests/student/updateStudentRequest';
import { CreateStudentRequest } from 'src/app/core/models/requests/student/createStudentRequest';
import { Store } from '@ngrx/store';
import { createStudentAction } from '../../store/actions/createStudent.action';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { Observable, lastValueFrom } from 'rxjs';
import { updateStudentAction } from '../../store/actions/updateStudent.action';
import { selectErrors } from '../../store/selectors';

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditStudentDialogComponent implements OnInit {
  public form!: FormGroup;

  readonly student: Student | null = inject(NZ_MODAL_DATA);

  errors$: Observable<string[] | null> = this.store.select(selectErrors);

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [this.student?.id ?? ''],
      firstName: [
        this.student?.firstName ?? '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      lastName: [
        this.student?.lastName ?? '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      middleName: [
        this.student?.middleName ?? '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      age: [
        this.student?.age ?? 0,
        Validators.compose([
          Validators.required,
          Validators.min(10),
          Validators.max(90),
        ]),
      ],
      group: [
        this.student?.group ?? '',
        Validators.compose([Validators.required, Validators.maxLength(10)]),
      ],
    });
  }

  async onSubmit(waitUntilLoading$: Observable<boolean>): Promise<boolean> {
    if (!this.form.valid) {
      this.markInvalidControlsAsDirty();
      return false;
    }

    if (this.student) {
      this.updateStudent();
    }

    if (!this.student) {
      this.createStudent();
    }

    return lastValueFrom(waitUntilLoading$);
  }

  markInvalidControlsAsDirty(): void {
    Object.values(this.form.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  private updateStudent(): void {
    const request: UpdateStudentRequest = this.form
      .value as UpdateStudentRequest;

    this.store.dispatch(updateStudentAction({ request }));
  }

  private createStudent(): void {
    const request: CreateStudentRequest = this.form
      .value as CreateStudentRequest;
    this.store.dispatch(createStudentAction({ request }));
  }
}
