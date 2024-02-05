import fs from 'fs/promises';
import { resolve } from 'path';
import { createHash } from 'crypto';
import { displayError } from '../utils/displayError.js';

export const hashCommand = async (path) => {
  try {
    const pathToFile = resolve(path);

    const fileContent = await fs.readFile(pathToFile, 'utf8');

    const hash = createHash('sha256').update(fileContent).digest('hex');

    console.log(hash);
  } catch (error) {
    displayError();
  }
};