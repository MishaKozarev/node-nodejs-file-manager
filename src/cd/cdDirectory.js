import path from 'path';
import fs from 'fs/promises';
import { displayError } from '../utils/displayError.js';

export async function cdDirectory(currentDirectory, requestDirectory) {
  try {
    let targetDirectory;
    if (/^[a-zA-Z]:$/.test(requestDirectory)) {
      targetDirectory = path.resolve(requestDirectory, '\\');
    } else {
      targetDirectory = path.resolve(currentDirectory, requestDirectory);
    }
    const stats = await fs.stat(targetDirectory);
    if (stats.isDirectory()) {
      return targetDirectory;
    } else {
      throw new Error();
    }
  } catch {
    displayError();
  }
}