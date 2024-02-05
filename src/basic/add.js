import fs from 'fs';
import { resolve } from 'path';
import { displayError } from '../utils/displayError.js';

export const addCommand = async (nameFile, currentDirectory) => {
  try {
    const pathToCurrentFile = resolve(currentDirectory, nameFile.toString());

    const result = new Promise((resolve, reject) => {
      const writableStream = fs.createWriteStream(pathToCurrentFile);
      writableStream.end();

      writableStream.on('finish', () => {
        console.log(`The file has been created ${pathToCurrentFile}`);
        resolve();
      });

      writableStream.on('error', (error) => {
        reject(error);
      });
    });
    return result;
  } catch (error) {
    displayError();
  }
};