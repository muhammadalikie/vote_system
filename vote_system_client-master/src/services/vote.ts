import {authAxios} from "./axios.ts";
import {UpdateVoteCartForm, VoteCartForm} from "../types/vote.ts";

export async function getVoteCartsService() {
  try {
    const response = await authAxios.get('/vote/vote_cart/');
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function getVoteCartService(voteCartId: number) {
  try {
    const response = await authAxios.get(`/vote/vote_cart/${voteCartId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function createVoteCartService(formData: VoteCartForm) {
  try {
    const response = await authAxios.post('/vote/vote_cart/', formData);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function updateVoteCartService(formData: UpdateVoteCartForm) {
  try {
    const response = await authAxios.patch(`/vote/vote_cart/${formData.id}/`, formData);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function deleteVoteCartService(voteCartId: number) {
  try {
    const response = await authAxios.delete(`/vote/vote_cart/${voteCartId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function getVoteCartVotesService(voteCartId: number) {
  try {
    const response = await authAxios.get(`/vote/vote_cart/${voteCartId}/votes/`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function createVoteCartVotesService(voteCartId: number, representative: string) {
  try {
    const response = await authAxios.post(`/vote/vote_cart/${voteCartId}/votes/`, {representative});
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function deleteVoteCartVoteService(voteCartId: number, voteId: number) {
  try {
    const response = await authAxios.delete(`/vote/vote_cart/${voteCartId}/votes/${voteId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}