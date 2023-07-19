import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of, mergeMap } from 'rxjs';
import { StudentApiService } from 'src/app/core/api/student-api.service';
import {
  createStudentAction,
  createStudentFailureAction,
  createStudentSuccessAction,
} from '../actions/createStudent.action';
import { getAllStudentsAction } from '../actions/getAllStudents.action';

@Injectable()
export class CreateStudentEffect {
  createStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createStudentAction),
      switchMap(({ request }) => {
        return this.studentService.create(request).pipe(
          map(createStudentSuccessAction),
          catchError(() => {
            return of(createStudentFailureAction());
          })
        );
      })
    );
  });

  createStudentSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createStudentSuccessAction),
      map(getAllStudentsAction)
    );
  });

  constructor(
    private actions$: Actions,
    private studentService: StudentApiService
  ) {}
}
