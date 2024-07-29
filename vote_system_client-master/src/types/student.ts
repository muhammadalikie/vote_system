import {Status} from "./global.ts";

export interface StudentState {
  studentStatus: Status;
  students: Student[];
}

export interface Student {
  id: number;
  username: string;
  requirements: string;
}

export interface StudentForm extends Omit<Student, 'id'> {
  password: string;
}

export interface EditStudentForm extends StudentForm {
  id: number;
}