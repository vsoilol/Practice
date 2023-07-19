import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentsTableComponent } from './pages/students-table/students-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditStudentDialogComponent } from './dialogs/edit-student-dialog/edit-student-dialog.component';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { GetAllStudentsEffect } from './store/effects/getAllStudents.effect';
import { EffectsModule } from '@ngrx/effects';
import { CreateStudentEffect } from './store/effects/createStudent.effect';
import { UpdateStudentEffect } from './store/effects/updateStudent.effect';
import { DeleteStudentEffect } from './store/effects/deleteStudent.effect';

@NgModule({
  declarations: [StudentsTableComponent, EditStudentDialogComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    StoreModule.forFeature('student', reducers),
    EffectsModule.forFeature([
      GetAllStudentsEffect,
      CreateStudentEffect,
      UpdateStudentEffect,
      DeleteStudentEffect,
    ]),
  ],
})
export class StudentModule {}
