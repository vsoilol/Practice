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
import { Exam } from 'src/app/core/models/responses/exam';
import { EditExamModalComponent } from '../../modal/edit-exam-modal/edit-exam-modal.component';
import { deleteExamAction } from '../../store/actions/deleteExam.action';
import { getAllExamsAction } from '../../store/actions/getAllExams.action';
import {
  selectExams,
  selectIsLoading,
  selectIsEditExamLoading,
  selectErrors,
  selectIsDeleteExamLoading,
  selectStudentsByExam,
  selectLoadingStudents,
} from '../../store/selectors';
import { Student } from 'src/app/core/models/responses/student';
import { loadStudentsForExamAction } from '../../store/actions/loadStudentsForExam.action';

@Component({
  selector: 'app-exams-table',
  templateUrl: './exams-table.component.html',
  styleUrls: ['./exams-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamsTableComponent implements OnInit {
  exams$!: Observable<Exam[]>;
  isLoadingExams$!: Observable<boolean>;
  waitUntilEditLoading$!: Observable<boolean>;
  studentsByExam$!: Observable<{ [examId: string]: Student[] }>;
  loadingStudents$!: Observable<{ [examId: string]: boolean }>;

  expandSet = new Set<string>();

  constructor(private store: Store, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.initializeValues();
    this.store.dispatch(getAllExamsAction());
  }

  initializeValues(): void {
    this.exams$ = this.store.select(selectExams);
    this.isLoadingExams$ = this.store.select(selectIsLoading);
    this.studentsByExam$ = this.store.select(selectStudentsByExam);
    this.loadingStudents$ = this.store.select(selectLoadingStudents);

    this.waitUntilEditLoading$ = this.store
      .select(selectIsEditExamLoading)
      .pipe(
        withLatestFrom(this.store.select(selectErrors)),
        filter(value => !value[0]),
        map(value => value[1] === null),
        take(1)
      );
  }

  showAddNewExamModal() {
    this.modalService.create({
      nzTitle: 'Добавить экзамен',
      nzContent: EditExamModalComponent,
      nzData: null,
      nzOkText: 'Сохранить',
      nzOnOk: _ => {
        return _.onSubmit(this.waitUntilEditLoading$);
      },
    });
  }

  showEditExamModal(exam: Exam) {
    const modal = this.modalService.create({
      nzTitle: 'Редактировать экзамен',
      nzContent: EditExamModalComponent,
      nzData: exam,
      nzOkText: 'Сохранить',
      nzOnOk: _ => {
        return _.onSubmit(this.waitUntilEditLoading$);
      },
    });
    modal.afterOpen.subscribe(() =>
      this.store.dispatch(loadStudentsForExamAction({ examId: exam.id }))
    );
  }

  showConfirmDeleteExamModal(id: string) {
    this.modalService.confirm({
      nzTitle: 'Вы уверены что хотите удалить экзамен?',
      nzOnOk: () => {
        this.store.dispatch(deleteExamAction({ id }));

        return lastValueFrom(
          this.store
            .select(selectIsDeleteExamLoading)
            .pipe(takeWhile(value => value))
        );
      },
    });
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.store.dispatch(loadStudentsForExamAction({ examId: id }));
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  loadStudentsForExam(examId: string): void {
    this.store.dispatch(loadStudentsForExamAction({ examId }));
  }
}
