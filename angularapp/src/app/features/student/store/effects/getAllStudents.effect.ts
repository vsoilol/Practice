import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, of, map, catchError } from 'rxjs';
import { StudentApiService } from 'src/app/core/api/student-api.service';
import {
  getAllStudentsAction,
  getAllStudentsFailureAction,
  getAllStudentsSuccessAction,
} from '../actions/getAllStudents.action';
import { Student } from 'src/app/core/models/responses/student';

@Injectable()
export class GetAllStudentsEffect {
  getAllStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllStudentsAction),
      switchMap(() => {
        return this.studentService.getAll().pipe(
          map((students: Student[]) => getAllStudentsSuccessAction({ students })),
          catchError(() => {
            return of(getAllStudentsFailureAction());
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private studentService: StudentApiService
  ) {}
}
