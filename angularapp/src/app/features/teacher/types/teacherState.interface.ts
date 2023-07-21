import { Teacher } from 'src/app/core/models/responses/teacher';
import { WorkingDay } from 'src/app/core/models/responses/workingDay';

export interface TeacherStateInterface {
  isLoading: boolean;
  isDeleteLoading: boolean;
  isEditLoading: boolean;
  teachers: Teacher[];
  errors: string[] | null;
  workingDays: WorkingDay[];
  isUpdateWorkingDaysLoading: boolean
}
