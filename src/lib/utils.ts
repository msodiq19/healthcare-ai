import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setToken = (name: string, value: string) => {
  localStorage.setItem(name, value);
  return;
};

export const getToken = (name: string) => {
  return localStorage.getItem(name);
};

export const clearTokens = () => {
  return localStorage.clear();
};

export const removeToken = (name: string) => {
  localStorage.removeItem(name);
};