import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { switchMap, map, catchError, of } from "rxjs";
import { StudentApiService } from "src/app/core/api/student-api.service";
import { updateStudentAction, updateStudentFailureAction, updateStudentSuccessAction } from "../actions/updateStudent.action";
import { getAllStudentsAction } from "../actions/getAllStudents.action";

@Injectable()
export class UpdateStudentEffect {
  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateStudentAction),
      switchMap(({request}) => {
        return this.studentService.update(request).pipe(
          map(updateStudentSuccessAction),
          catchError(() => {
            return of(updateStudentFailureAction());
          })
        );
      })
    );
  });

  updateStudentSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateStudentSuccessAction),
      map(getAllStudentsAction)
    );
  });

  constructor(
    private actions$: Actions,
    private studentService: StudentApiService
  ) {}
}