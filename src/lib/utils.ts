import { clsx, type ClassValue } from "clsx";
import { nanoid } from 'nanoid';
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateDefaultValuesFromArray = <T extends { name: string, defaultValue?: string }, RT>(data: T[]) => {
  let rv: any = {};
  for (let i = 0; i < data.length; ++i) {
    const item = data[i];
    rv[item.name] = item.defaultValue;
  }
  return rv as RT;
};

export const getValueFromArray = <T extends { value: string, label: string }>(arr: T[], q?: string) => {
  return arr.find(({ value }) => value === q)?.label;
};

export const uuid = () => {
  const value = nanoid();
  return value;
};

export const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}