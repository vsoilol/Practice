import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { TeacherApiService } from 'src/app/core/api/teacher-api.service';
import {
  createTeacherAction,
  createTeacherFailureAction,
  createTeacherSuccessAction,
} from '../actions/createTeacher.action';
import { getAllTeachersAction } from '../actions/getAllTeachers.action';

@Injectable()
export class CreateTeacherEffect {
  createTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createTeacherAction),
      switchMap(({ request }) => {
        return this.teacherService.create(request).pipe(
          map(createTeacherSuccessAction),
          catchError(() => {
            return of(createTeacherFailureAction());
          })
        );
      })
    );
  });

  createTeacherSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createTeacherSuccessAction),
      map(getAllTeachersAction)
    );
  });

  constructor(
    private actions$: Actions,
    private teacherService: TeacherApiService
  ) {}
}
