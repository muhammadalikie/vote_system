import {authAxios, globalAxios} from "./axios.ts";
import {getItem, TOKEN_KEY} from "./storage.ts";
import {UserForm} from "../types/auth.ts";


export async function signinService(formData: UserForm) {
  try {
    const response = await globalAxios.post('/auth/jwt/create', formData);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}

export async function verifyTokenService() {
  try {
    const token: string | null = getItem(TOKEN_KEY);
    if (token) {
      await authAxios.post('/auth/jwt/verify', {token});
      return true;
    }
    return false;
  } catch (error: any) {
    return false;
  }
}

export async function getUserService() {
  try {
    const response = await authAxios.get('/auth/users/me');
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? "";
  }
}