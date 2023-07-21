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
import { deleteSubjectAction } from '../../store/actions/deleteSubject.action';
import { getAllSubjectsAction } from '../../store/actions/getAlLSubjects.action';
import {
  selectSubjects,
  selectIsEditSubjectLoading,
  selectErrors,
  selectIsDeleteSubjectLoading,
  selectIsLoading,
} from '../../store/selectors';
import { Subject } from 'src/app/core/models/responses/subject';
import { EditSubjectModalComponent } from '../../modals/edit-subject-modal/edit-subject-modal.component';

@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectsTableComponent implements OnInit {
  subjects$!: Observable<Subject[]>;
  isLoadingSubjects$!: Observable<boolean>;
  waitUntilEditLoading$!: Observable<boolean>;

  expandSet = new Set<string>();

  constructor(private store: Store, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.initializeValues();
    this.store.dispatch(getAllSubjectsAction());
  }

  initializeValues(): void {
    this.subjects$ = this.store.select(selectSubjects);
    this.isLoadingSubjects$ = this.store.select(selectIsLoading);

    this.waitUntilEditLoading$ = this.store
      .select(selectIsEditSubjectLoading)
      .pipe(
        withLatestFrom(this.store.select(selectErrors)),
        filter(value => !value[0]),
        map(value => value[1] === null),
        take(1)
      );
  }

  showAddNewSubjectModal() {
    this.modalService.create({
      nzTitle: 'Добавить дисциплину',
      nzContent: EditSubjectModalComponent,
      nzData: null,
      nzOkText: 'Сохранить',
      nzOnOk: _ => {
        return _.onSubmit(this.waitUntilEditLoading$);
      },
    });
  }

  showEditSubjectModal(subject: Subject) {
    this.modalService.create({
      nzTitle: 'Редактировать дисциплину',
      nzContent: EditSubjectModalComponent,
      nzData: subject,
      nzOkText: 'Сохранить',
      nzOnOk: _ => {
        return _.onSubmit(this.waitUntilEditLoading$);
      },
    });
  }

  showConfirmDeleteSubjectModal(id: string) {
    this.modalService.confirm({
      nzTitle: 'Вы уверены что хотите удалить дисциплину?',
      nzOnOk: () => {
        this.store.dispatch(deleteSubjectAction({ id }));

        return lastValueFrom(
          this.store
            .select(selectIsDeleteSubjectLoading)
            .pipe(takeWhile(value => value))
        );
      },
    });
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
}
