import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  Observable,
  withLatestFrom,
  filter,
  map,
  take,
  lastValueFrom,
  takeWhile,
} from 'rxjs';
import { Teacher } from 'src/app/core/models/responses/teacher';
import { deleteTeacherAction } from '../../store/actions/deleteTeacher.action';
import { getAllTeachersAction } from '../../store/actions/getAllTeachers.action';
import {
  selectTeachers,
  selectIsEditTeacherLoading,
  selectErrors,
  selectIsDeleteTeacherLoading,
  selectIsLoading,
} from '../../store/selectors';
import { EditTeacherModalComponent } from '../../modals/edit-teacher-modal/edit-teacher-modal.component';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersTableComponent implements OnInit {
  teachers$!: Observable<Teacher[]>;
  isLoadingTeachers$!: Observable<boolean>;
  waitUntilEditLoading$!: Observable<boolean>;

  constructor(private store: Store, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.initializeValues();
    this.store.dispatch(getAllTeachersAction());
  }

  initializeValues(): void {
    this.teachers$ = this.store.select(selectTeachers);
    this.isLoadingTeachers$ = this.store.select(selectIsLoading);

    this.waitUntilEditLoading$ = this.store
      .select(selectIsEditTeacherLoading)
      .pipe(
        withLatestFrom(this.store.select(selectErrors)),
        filter(value => !value[0]),
        map(value => value[1] === null),
        take(1)
      );
  }

  showAddNewTeacherModal() {
    this.modalService.create({
      nzTitle: 'Добавить преподавателя',
      nzContent: EditTeacherModalComponent,
      nzData: null,
      nzOkText: 'Сохранить',
      nzOnOk: _ => {
        return _.onSubmit(this.waitUntilEditLoading$);
      },
    });
  }

  showEditTeacherModal(teacher: Teacher) {
    this.modalService.create({
      nzTitle: 'Редактировать преподавателя',
      nzContent: EditTeacherModalComponent,
      nzData: teacher,
      nzOkText: 'Сохранить',
      nzOnOk: _ => {
        return _.onSubmit(this.waitUntilEditLoading$);
      },
    });
  }

  showConfirmDeleteTeacherModal(id: string) {
    this.modalService.confirm({
      nzTitle: 'Вы уверены что хотите удалить преподавателя?',
      nzOnOk: () => {
        this.store.dispatch(deleteTeacherAction({ id }));

        return lastValueFrom(
          this.store
            .select(selectIsDeleteTeacherLoading)
            .pipe(takeWhile(value => value))
        );
      },
    });
  }
}
