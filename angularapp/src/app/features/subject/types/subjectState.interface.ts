import { Subject } from "src/app/core/models/responses/subject";

export interface SubjectStateInterface {
  isLoading: boolean;
  isDeleteLoading: boolean;
  isEditLoading: boolean;
  subjects: Subject[];
  errors: string[] | null;
}
