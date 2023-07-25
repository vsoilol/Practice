import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { TeacherApiService } from 'src/app/core/api/teacher-api.service';
import {
  deleteTeacherAction,
  deleteTeacherFailureAction,
  deleteTeacherSuccessAction,
} from '../actions/deleteTeacher.action';
import { getAllTeachersAction } from '../actions/getAllTeachers.action';

@Injectable()
export class DeleteTeacherEffect {
  deleteTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTeacherAction),
      switchMap(({ id }) => {
        return this.teacherService.delete(id).pipe(
          map(deleteTeacherSuccessAction),
          catchError(() => {
            return of(deleteTeacherFailureAction());
          })
        );
      })
    );
  });

  deleteTeacherSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTeacherSuccessAction),
      map(getAllTeachersAction)
    );
  });

  constructor(
    private actions$: Actions,
    private teacherService: TeacherApiService
  ) {}
}
