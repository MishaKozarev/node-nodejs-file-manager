import path from 'path';
import fs from 'fs/promises';
import { displayError } from '../utils/displayError.js';

export async function upDirectory (currentDirectory) {
  try {
    let parentDirectory = path.dirname(currentDirectory);
    const stats = await fs.stat(parentDirectory);
    if (stats.isDirectory()) {
      return parentDirectory;
    }
  } catch {
    displayError();
  }
}