import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, of, map, catchError } from 'rxjs';
import { ExamApiService } from 'src/app/core/api/exam-api.service';
import {
  getAllExamsAction,
  getAllExamsFailureAction,
  getAllExamsSuccessAction,
} from '../actions/getAllExams.action';
import { Exam } from 'src/app/core/models/responses/exam';

@Injectable()
export class GetAllExamsEffect {
  getAllExams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllExamsAction),
      switchMap(() => {
        return this.examService.getAll().pipe(
          map((exams: Exam[]) => getAllExamsSuccessAction({ exams })),
          catchError(() => {
            return of(getAllExamsFailureAction());
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private examService: ExamApiService
  ) {}
}
