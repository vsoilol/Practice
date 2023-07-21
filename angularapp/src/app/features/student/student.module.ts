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
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

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
    NzTableModule,
    NzModalModule,
    NzFormModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
  ],
})
export class StudentModule {}
