import { Student } from "src/app/core/models/responses/student";

export interface StudentStateInterface {
  isLoading: boolean;
  students: Student[];
}
