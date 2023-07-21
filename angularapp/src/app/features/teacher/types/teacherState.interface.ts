import { Teacher } from 'src/app/core/models/responses/teacher';

export interface TeacherStateInterface {
  isLoading: boolean;
  isDeleteLoading: boolean;
  isEditLoading: boolean;
  teachers: Teacher[];
  errors: string[] | null;
}
