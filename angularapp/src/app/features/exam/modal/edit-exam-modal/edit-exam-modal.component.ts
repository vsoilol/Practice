import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import {
  Observable,
  filter,
  lastValueFrom,
  map,
  take,
} from 'rxjs';
import { CreateExamRequest } from 'src/app/core/models/requests/exam/createExamRequest';
import { UpdateExamRequest } from 'src/app/core/models/requests/exam/updateExamRequest';
import { Exam } from 'src/app/core/models/responses/exam';
import { createExamAction } from '../../store/actions/createExam.action';
import { updateExamAction } from '../../store/actions/updateExam.action';
import {
  selectErrors,
  selectIsStudentsLoading,
  selectIsSubjectsLoading,
  selectIsTeachersLoading,
  selectStudents,
  selectStudentsByExam,
  selectSubjects,
  selectTeachers,
} from '../../store/selectors';
import { Teacher } from 'src/app/core/models/responses/teacher';
import { Subject } from 'src/app/core/models/responses/subject';
import { Student } from 'src/app/core/models/responses/student';
import { getTeachersAction } from '../../store/actions/getTeachers.action';
import { getSubjectsAction } from '../../store/actions/getSubjects.action';
import { getStudentsAction } from '../../store/actions/getStudents.action';
import { DateHelperService } from 'src/app/shared/services/date-helper.service';

@Component({
  selector: 'app-edit-exam-modal',
  templateUrl: './edit-exam-modal.component.html',
  styleUrls: ['./edit-exam-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditExamModalComponent implements OnInit {
  public form!: FormGroup;

  readonly exam: Exam | null = inject(NZ_MODAL_DATA);

  errors$: Observable<string[] | null> = this.store.select(selectErrors);

  teachers$!: Observable<Teacher[]>;
  subjects$!: Observable<Subject[]>;
  students$!: Observable<Student[]>;

  isTeachersLoading$!: Observable<boolean>;
  isSubjectsLoading$!: Observable<boolean>;
  isStudentsLoading$!: Observable<boolean>;

  isTeachersSelectOpen = false;

  teacherId = 'efb368cd-1f0b-4bf8-f1f9-08db8784b145';
  studentsIs = [
    'c4cab519-58ec-4017-88c9-08db87844c65',
    'fcf29ba7-ecf3-4a71-88c5-08db87844c65',
  ];

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dateHelper: DateHelperService
  ) {}

  ngOnInit(): void {
    const date = this.exam?.date ?? new Date();

    this.store.dispatch(getTeachersAction({ date }));
    this.store.dispatch(getSubjectsAction());
    this.store.dispatch(getStudentsAction());

    this.initializeValues();
    this.initializeForm();
  }

  initializeValues(): void {
    this.teachers$ = this.store.select(selectTeachers);
    this.subjects$ = this.store.select(selectSubjects);
    this.students$ = this.store.select(selectStudents);

    this.isTeachersLoading$ = this.store.select(selectIsTeachersLoading);
    this.isSubjectsLoading$ = this.store.select(selectIsSubjectsLoading);
    this.isStudentsLoading$ = this.store.select(selectIsStudentsLoading);
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [this.exam?.id ?? ''],
      teacherId: [
        this.exam?.teacher.id ?? '',
        Validators.compose([Validators.required]),
      ],
      subjectId: [
        this.exam?.subject.id ?? '',
        Validators.compose([Validators.required]),
      ],
      date: [this.exam?.date ?? new Date()],
      studentIds: [[]],
    });

    if (this.exam) {
      this.store
        .select(selectStudentsByExam)
        .pipe(
          filter(_ => _[this.exam!.id] !== undefined),
          take(1),
          map(_ => _[this.exam!.id].map(student => student.id))
        )
        .subscribe(studentIds => {
          this.form.get('studentIds')?.patchValue(studentIds);
        });
    }
  }

  async onSubmit(waitUntilLoading$: Observable<boolean>): Promise<boolean> {
    if (!this.form.valid) {
      this.markInvalidControlsAsDirty();
      return false;
    }

    if (this.exam) {
      this.updateExam();
    }

    if (!this.exam) {
      this.createExam();
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

  private updateExam(): void {
    const request: UpdateExamRequest = this.form.value as UpdateExamRequest;

    request.date = this.dateHelper.toISOString(this.form.value.date);

    this.store.dispatch(updateExamAction({ request }));
  }

  private createExam(): void {
    const request: CreateExamRequest = this.form.value as CreateExamRequest;

    request.date = this.dateHelper.toISOString(this.form.value.date);

    this.store.dispatch(createExamAction({ request }));
  }

  handleTeacherSelectOpen(): void {
    if (!this.isTeachersSelectOpen) {
      //this.store.dispatch(getTeachersAction());
    }
  }

  onChangeDate(date: Date | null): void {
    if (date !== null) {
      this.store.dispatch(getTeachersAction({ date }));
    }
  }
}
