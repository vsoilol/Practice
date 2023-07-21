import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { EditStudentDialogComponent } from '../../dialogs/edit-student-dialog/edit-student-dialog.component';
import { Student } from 'src/app/core/models/responses/student';
import {
  Observable,
  filter,
  lastValueFrom,
  map,
  take,
  takeWhile,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectErrors,
  selectIsDeleteStudentLoading,
  selectIsEditStudentLoading,
  selectIsStudentLoading,
  selectStudents,
} from '../../store/selectors';
import { getAllStudentsAction } from '../../store/actions/getAllStudents.action';
import { deleteStudentAction } from '../../store/actions/deleteStudent.action';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsTableComponent implements OnInit {
  students$!: Observable<Student[]>;
  isLoadingStudents$!: Observable<boolean>;
  waitUntilEditLoading$!: Observable<boolean>;

  constructor(
    private store: Store,
    private modalService: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.store.dispatch(getAllStudentsAction());
  }

  initializeValues(): void {
    this.students$ = this.store.select(selectStudents);
    this.isLoadingStudents$ = this.store.select(selectIsStudentLoading);

    this.waitUntilEditLoading$ = this.store
      .select(selectIsEditStudentLoading)
      .pipe(
        withLatestFrom(this.store.select(selectErrors)),
        filter(value => !value[0]),
        map(value => value[1] === null),
        take(1)
      );
  }

  showAddNewStudentModal() {
    this.modalService.create({
      nzTitle: 'Добавить студента',
      nzContent: EditStudentDialogComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: null,
      nzOkText: 'Сохранить',
      nzOnOk: _ => {
        return _.onSubmit(this.waitUntilEditLoading$);
      },
    });
  }

  showEditStudentModal(student: Student) {
    this.modalService.create({
      nzTitle: 'Редактировать студента',
      nzContent: EditStudentDialogComponent,
      nzData: student,
      nzOkText: 'Сохранить',
      nzOnOk: _ => {
        return _.onSubmit(this.waitUntilEditLoading$);
      },
    });
  }

  showConfirmDeleteStudentModal(id: string) {
    this.modalService.confirm({
      nzTitle: 'Вы уверены что хотите удалить студента?',
      nzOnOk: () => {
        this.store.dispatch(deleteStudentAction({ id }));

        return lastValueFrom(
          this.store
            .select(selectIsDeleteStudentLoading)
            .pipe(takeWhile(value => value))
        );
      },
    });
  }
}
