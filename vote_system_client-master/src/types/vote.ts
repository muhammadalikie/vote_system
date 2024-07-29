import {Status} from "./global.ts";
import {Moment} from "moment/moment";
import {Representative} from "./representative.ts";

export interface VoteState {
  voteStatus: Status;
  voteCarts: VoteCartType[];
  currentVoteCart: VoteCartType;
  currentVoteCartVotes: VoteCartVote[];
}

export interface VoteCartType {
  id: number;
  name: string;
  description: string;
  start_date: string | Date;
  end_date: string | Date;
  representative_set: VoteCartRepresentative[];
  requirements: string;
  vote_count: number;

}

export interface VoteCartForm extends Omit<VoteCartType, 'id' | 'representative_set' | 'start_date' | 'end_date' | 'requirements'> {
  requirements?: string;
  start_date: string | Moment | null;
  end_date: string | Moment | null;
}

export interface UpdateVoteCartForm extends VoteCartForm {
  id: number;
}

export interface VoteCartError extends Omit<VoteCartForm, 'vote_count' | 'start_date' | 'end_date'> {
  vote_count: string;
  start_date: string;
  end_date: string;
}

export interface VoteCartRepresentative extends Omit<Representative, 'student' | 'vote_cart' | 'number_of_votes'> {

}

export interface VoteCartVote {
  id: number;
  student: string;
  representative: string;
  date: string;
}

export interface VoteCount {
  [key: string]: number;
}