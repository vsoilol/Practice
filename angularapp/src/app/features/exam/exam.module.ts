import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateExamEffect } from './store/effects/createExam.effect';
import { DeleteExamEffect } from './store/effects/deleteExam.effect';
import { GetAllExamsEffect } from './store/effects/getAllExams.effect';
import { UpdateExamEffect } from './store/effects/updateExam.effect';
import { LoadStudentsForExamEffect } from './store/effects/loadStudentsForExam.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { ExamsTableComponent } from './pages/exams-table/exams-table.component';
import { EditExamModalComponent } from './modal/edit-exam-modal/edit-exam-modal.component';
import { GetTeachersEffect } from './store/effects/getTeachers.action';
import { GetSubjectsEffect } from './store/effects/getSubjects.action';
import { GetStudentsEffect } from './store/effects/getStudents.effect';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzListModule } from 'ng-zorro-antd/list';

@NgModule({
  declarations: [ExamsTableComponent, EditExamModalComponent],
  imports: [
    CommonModule,
    ExamRoutingModule,
    StoreModule.forFeature('exam', reducers),
    EffectsModule.forFeature([
      GetAllExamsEffect,
      CreateExamEffect,
      UpdateExamEffect,
      DeleteExamEffect,
      LoadStudentsForExamEffect,
      GetTeachersEffect,
      GetSubjectsEffect,
      GetStudentsEffect,
    ]),
    SharedModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzListModule
  ],
})
export class ExamModule {}
