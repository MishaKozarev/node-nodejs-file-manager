import fs from 'fs';
import { resolve } from 'path';
import { displayError } from '../utils/displayError.js';

export const rnCommand = async (nameFile) => {
  try {
    const pathToCurrentFile = resolve(nameFile[0]);
    const pathToNewFile = resolve(nameFile[1]);

    await fs.promises.rename(pathToCurrentFile, pathToNewFile);
    console.log(`The file has been renamed`);
  } catch (error) {
    displayError();
  }
};