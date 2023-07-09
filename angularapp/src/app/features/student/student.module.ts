import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentsTableComponent } from './pages/students-table/students-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentService } from './services/student.service';
import { StudentsDataSourceService } from './services/students-data-source.service';
import { EditStudentDialogComponent } from './dialogs/edit-student-dialog/edit-student-dialog.component';

@NgModule({
  declarations: [
    StudentsTableComponent,
    EditStudentDialogComponent
  ],
  imports: [CommonModule, StudentRoutingModule, SharedModule],
  providers: [StudentService, StudentsDataSourceService]
})
export class StudentModule {}
