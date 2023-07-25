import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { Observable, lastValueFrom } from 'rxjs';
import { CreateTeacherRequest } from 'src/app/core/models/requests/teacher/createTeacherRequest';
import { UpdateTeacherRequest } from 'src/app/core/models/requests/teacher/updateTeacherRequest';
import { Teacher } from 'src/app/core/models/responses/teacher';
import { createTeacherAction } from '../../store/actions/createTeacher.action';
import { updateTeacherAction } from '../../store/actions/updateTeacher.action';
import { selectErrors } from '../../store/selectors';

@Component({
  selector: 'app-edit-teacher-modal',
  templateUrl: './edit-teacher-modal.component.html',
  styleUrls: ['./edit-teacher-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTeacherModalComponent implements OnInit {
  public form!: FormGroup;

  readonly teacher: Teacher | null = inject(NZ_MODAL_DATA);

  errors$: Observable<string[] | null> = this.store.select(selectErrors);

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [this.teacher?.id ?? ''],
      firstName: [
        this.teacher?.firstName ?? '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      lastName: [
        this.teacher?.lastName ?? '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      middleName: [
        this.teacher?.middleName ?? '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
    });
  }

  async onSubmit(waitUntilLoading$: Observable<boolean>): Promise<boolean> {
    if (!this.form.valid) {
      this.markInvalidControlsAsDirty();
      return false;
    }

    if (this.teacher) {
      this.updateTeacher();
    }

    if (!this.teacher) {
      this.createTeacher();
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

  private updateTeacher(): void {
    const request: UpdateTeacherRequest = this.form
      .value as UpdateTeacherRequest;

    this.store.dispatch(updateTeacherAction({ request }));
  }

  private createTeacher(): void {
    const request: CreateTeacherRequest = this.form
      .value as CreateTeacherRequest;
    this.store.dispatch(createTeacherAction({ request }));
  }
}
