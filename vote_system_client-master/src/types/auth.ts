import {Status} from "./global.ts";

export interface AuthState {
  authStatus: Status;
  user: User | null;
}

export interface User {
  id: number;
  username: string;
  requirements: string;
  is_staff: boolean;
}

export interface UserForm extends Omit<User, 'id' | 'requirements' | 'is_staff'> {
  password: string;
}