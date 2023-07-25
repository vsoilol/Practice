import { Pipe, PipeTransform } from '@angular/core';
import { Teacher } from 'src/app/core/models/responses/teacher';

@Pipe({
  name: 'teacherFullName',
})
export class TeacherFullNamePipe implements PipeTransform {
  transform(value: Teacher, ...args: unknown[]): string {
    return `${value.lastName} ${value.firstName} ${value.middleName}`;
  }
}
