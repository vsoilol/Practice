import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { ExamApiService } from 'src/app/core/api/exam-api.service';
import {
  updateExamAction,
  updateExamFailureAction,
  updateExamSuccessAction,
} from '../actions/updateExam.action';
import { getAllExamsAction } from '../actions/getAllExams.action';

@Injectable()
export class UpdateExamEffect {
  updateExam$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateExamAction),
      switchMap(({ request }) => {
        return this.examService.update(request).pipe(
          map(updateExamSuccessAction),
          catchError(() => {
            return of(updateExamFailureAction());
          })
        );
      })
    );
  });

  updateExamSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateExamSuccessAction),
      map(getAllExamsAction)
    );
  });

  constructor(
    private actions$: Actions,
    private examService: ExamApiService
  ) {}
}
