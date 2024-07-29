import {Status} from "./global.ts";

export interface RepresentativeState {
  representativeStatus: Status;
  representatives: Representative[];
}

export interface Representative {
  id: number;
  student: number;
  username: string;
  name: string;
  vote_cart: number;
  vote_cart_name: string;
  number_of_votes: number;
}

export interface RepresentativeForm extends Omit<Representative, 'id' | 'username' | 'number_of_votes' | 'vote_cart_name'> {
}

export interface RepresentativeError extends Omit<RepresentativeForm, 'student' | 'vote_cart'> {
  student: string;
  vote_cart: string;
}

export interface EditRepresentativeForm extends RepresentativeForm {
  id: number;
}