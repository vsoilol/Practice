import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/core/models/responses/student';

@Pipe({
  name: 'studentFullName',
})
export class StudentFullNamePipe implements PipeTransform {
  transform(value: Student, ...args: unknown[]): string {
    return `${value.lastName} ${value.firstName} ${value.middleName}`;
  }
}
