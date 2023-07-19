import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { StudentApiService } from 'src/app/core/api/student-api.service';
import {
  deleteStudentAction,
  deleteStudentFailureAction,
  deleteStudentSuccessAction,
} from '../actions/deleteStudent.action';
import { getAllStudentsAction } from '../actions/getAllStudents.action';

@Injectable()
export class DeleteStudentEffect {
  deleteStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteStudentAction),
      switchMap(({ id }) => {
        return this.studentService.delete(id).pipe(
          map(deleteStudentSuccessAction),
          catchError(() => {
            return of(deleteStudentFailureAction());
          })
        );
      })
    );
  });

  deleteStudentSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteStudentSuccessAction),
      map(getAllStudentsAction)
    );
  });

  constructor(
    private actions$: Actions,
    private studentService: StudentApiService
  ) {}
}
