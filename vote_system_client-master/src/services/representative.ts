import {authAxios} from "./axios.ts";
import {EditRepresentativeForm, RepresentativeForm} from "../types/representative.ts";

export async function getRepresentativesService() {
  try {
    const response = await authAxios.get('/vote/representatives/');
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function createRepresentativeService(formData: RepresentativeForm) {
  try {
    const response = await authAxios.post('/vote/representatives/', formData);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function editRepresentativeService(formData: EditRepresentativeForm) {
  try {
    const response = await authAxios.patch(`/vote/representatives/${formData.id}/`, formData);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function deleteRepresentativeService(representativeId: number) {
  try {
    const response = await authAxios.delete(`/vote/representatives/${representativeId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}