import { nanoid } from 'nanoid';
import { exists } from '../db/store.js';

export const generateShortCode = (inputCode = null) => {
  if (inputCode && !exists(inputCode)) return inputCode;

  let newCode;
  do {
    newCode = nanoid(7);
  } while (exists(newCode));

  return newCode;
};
