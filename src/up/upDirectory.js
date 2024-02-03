import path from 'path';
import fs from 'fs/promises';

export async function upDirectory (currentDirectory) {
  try {
    let parentDirectory = path.dirname(currentDirectory);
    const stats = await fs.stat(parentDirectory);
    if (stats.isDirectory()) {
      console.log(`You are currently in ${parentDirectory}`);
      return parentDirectory;
    }
  } catch {
    displayError();
  }
}