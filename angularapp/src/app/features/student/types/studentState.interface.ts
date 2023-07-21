import { Student } from "src/app/core/models/responses/student";

export interface StudentStateInterface {
  isLoading: boolean;
  isDeleteLoading: boolean;
  isEditLoading: boolean;
  students: Student[];
  errors: string[] | null;
}
