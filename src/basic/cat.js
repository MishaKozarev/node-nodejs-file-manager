import fs from 'fs';
import { resolve } from 'path';
import { displayError } from '../utils/displayError.js';

export const catCommand = async (path) => {
  try {
    const pathToCurrentFile = resolve(await path.toString());

    const result = new Promise((resolve, reject) => {
      const readableStream = fs.createReadStream(pathToCurrentFile, {
        encoding: 'utf8',
      });

      let data = '';

      readableStream.on('data', (chunk) => {
        data += chunk;
      });

      readableStream.on('end', () => {
        console.log(`${data}`);
        resolve();
      });

      readableStream.on('error', (error) => {
        reject(error);
      });
    });

    return result;
  } catch {
    displayError();
  }
};