export const TOKEN_KEY: string = 'Token';

export function getItem(key: string): string | null {
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key);
  }
  return null;
}

export function setItem(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function removeItem(key: string): void {
  localStorage.removeItem(key);
}