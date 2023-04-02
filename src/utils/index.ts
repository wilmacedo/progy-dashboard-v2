import { STORAGE_PATH } from '@/constants';

export const getFirstsLetters = (name: string): string => {
  const names = name.split(' ');
  if (names.length === 0) return 'N/A';
  if (names.length === 1) return names[0].substring(0, 1).toUpperCase();

  const letters = names.map(n => n.substring(0, 1).toUpperCase());
  letters.length = 2;
  return letters.join('');
};

export const saveLocalStorageItem = (path: string, value: object) => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(`${STORAGE_PATH}/${path}`, JSON.stringify(value));
};

export const getLocalStorageItem = <T>(
  path: string,
  key: string,
): T | boolean => {
  if (typeof window === 'undefined') return false;

  const item = localStorage.getItem(`${STORAGE_PATH}/${path}`);
  if (!item) return false;

  try {
    const parsedItem = JSON.parse(item);

    return parsedItem[key] as T;
  } catch (e) {
    console.error('Error parsing localStorage item', e);
    return false;
  }
};

export const validateBase64 = (base64: string): boolean => {
  const regex =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

  return regex.test(base64);
};
