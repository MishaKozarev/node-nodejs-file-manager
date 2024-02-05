import fs from 'fs/promises';
import { displayError } from '../utils/displayError.js';

export const rmCommand = async (args) => {
  try {
    await fs.unlink(args);
    console.log(`The file has been deleted`);
  } catch (error) {
    displayError();
  }
};