import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { StudentApiService } from 'src/app/core/api/student-api.service';
import { Student } from 'src/app/core/models/responses/student';
import {
  getStudentsAction,
  getStudentsSuccessAction,
  getStudentsFailureAction,
} from '../actions/getStudents.action';

@Injectable()
export class GetStudentsEffect {
  getStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getStudentsAction),
      switchMap(() => {
        return this.studentApiService.getAll().pipe(
          map((students: Student[]) => getStudentsSuccessAction({ students })),
          catchError(() => {
            return of(getStudentsFailureAction());
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
