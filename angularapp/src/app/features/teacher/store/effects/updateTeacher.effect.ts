import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { TeacherApiService } from 'src/app/core/api/teacher-api.service';
import {
  updateTeacherAction,
  updateTeacherFailureAction,
  updateTeacherSuccessAction,
} from '../actions/updateTeacher.action';
import { getAllTeachersAction } from '../actions/getAllTeachers.action';

@Injectable()
export class UpdateTeacherEffect {
  updateTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTeacherAction),
      switchMap(({ request }) => {
        return this.teacherService.update(request).pipe(
          map(updateTeacherSuccessAction),
          catchError(() => {
            return of(updateTeacherFailureAction());
          })
        );
      })
    );
  });

  updateTeacherSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTeacherSuccessAction),
      map(getAllTeachersAction)
    );
  });

  constructor(
    private actions$: Actions,
    private teacherService: TeacherApiService
  ) {}
}
