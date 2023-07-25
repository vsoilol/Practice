import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadStudentsForExamAction,
  loadStudentsForExamFailureAction,
  loadStudentsForExamSuccessAction,
} from '../actions/loadStudentsForExam.action';
import { switchMap, map, catchError, of } from 'rxjs';
import { StudentApiService } from 'src/app/core/api/student-api.service';
import { Student } from 'src/app/core/models/responses/student';

@Injectable()
export class LoadStudentsForExamEffect {
  loadStudentsForExam$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadStudentsForExamAction),
      switchMap(({ examId }) => {
        return this.studentApiService.getAllByExamId(examId).pipe(
          map((students: Student[]) =>
            loadStudentsForExamSuccessAction({ students, examId })
          ),
          catchError(() => {
            return of(loadStudentsForExamFailureAction({ examId }));
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private studentApiService: StudentApiService
  ) {}
}
