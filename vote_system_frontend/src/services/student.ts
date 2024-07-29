import {authAxios} from "./axios.ts";
import {EditStudentForm, StudentForm} from "../types/student.ts";

export async function getStudentsService() {
  try {
    const response = await authAxios.get('/vote/students/');
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function getStudentService(studentId: number) {
  try {
    const response = await authAxios.get(`/vote/students/${studentId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function createStudentService(formData: StudentForm) {
  try {
    const response = await authAxios.post('/vote/students/', formData);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function editStudentService(formData: EditStudentForm) {
  try {
    const response = await authAxios.patch(`/vote/students/${formData.id}/`, formData);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function deleteStudentService(studentId: number) {
  try {
    const response = await authAxios.delete(`/vote/students/${studentId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}