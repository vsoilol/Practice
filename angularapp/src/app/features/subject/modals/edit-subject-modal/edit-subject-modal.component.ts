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
import { CreateSubjectRequest } from 'src/app/core/models/requests/subject/createSubjectRequest';
import { UpdateSubjectRequest } from 'src/app/core/models/requests/subject/updateSubjectRequest';
import { Subject } from 'src/app/core/models/responses/subject';
import { createSubjectAction } from '../../store/actions/createSubject.action';
import { updateSubjectAction } from '../../store/actions/updateSubject.action';
import { selectErrors } from '../../store/selectors';

@Component({
  selector: 'app-edit-subject-modal',
  templateUrl: './edit-subject-modal.component.html',
  styleUrls: ['./edit-subject-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSubjectModalComponent implements OnInit {
  public form!: FormGroup;

  readonly subject: Subject | null = inject(NZ_MODAL_DATA);

  errors$: Observable<string[] | null> = this.store.select(selectErrors);

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [this.subject?.id ?? ''],
      title: [
        this.subject?.title ?? '',
        Validators.compose([Validators.required, Validators.maxLength(30)]),
      ],
      description: [this.subject?.description ?? ''],
    });
  }

  async onSubmit(waitUntilLoading$: Observable<boolean>): Promise<boolean> {
    if (!this.form.valid) {
      this.markInvalidControlsAsDirty();
      return false;
    }

    if (this.subject) {
      this.updateSubject();
    }

    if (!this.subject) {
      this.createSubject();
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

  private updateSubject(): void {
    const request: UpdateSubjectRequest = this.form
      .value as UpdateSubjectRequest;

    request.description =
      request.description?.length === 0 || !request.description?.trim()
        ? null
        : request.description;

    this.store.dispatch(updateSubjectAction({ request }));
  }

  private createSubject(): void {
    const request: CreateSubjectRequest = this.form
      .value as CreateSubjectRequest;

    request.description =
      request.description?.length === 0 || !request.description?.trim()
        ? null
        : request.description;

    this.store.dispatch(createSubjectAction({ request }));
  }

 
}
