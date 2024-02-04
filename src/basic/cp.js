import fs from 'fs';
import path, { resolve as resolveToPath } from 'path';
import { displayError } from '../utils/displayError.js';


export const cpCommand = async (args) => {
  try {
    const pathToCurrentFile = args[0];
    const pathToNewDirectory = args[1];

    if (!pathToNewDirectory) {
      throw new Error();
    }

    const readableStream = fs.createReadStream(resolveToPath(pathToCurrentFile), {
      encoding: 'utf-8',
    });

    const result = new Promise((resolve, reject) => {
      let data = '';

      readableStream.on('data', (chunk) => {
        data += chunk;
      });

      readableStream.on('end', () => {
        const fileName = path.basename(pathToCurrentFile);
        const pathToNewFile = resolveToPath(
          pathToNewDirectory,
          fileName,
        );
        const writableStream = fs.createWriteStream(pathToNewFile);

        writableStream.end(data);

        writableStream.on('finish', () => {
          console.log(`File copied to ${pathToNewDirectory}`);
          resolve();
        });

        writableStream.on('error', (error) => {
          reject(error);
        });
      });

      readableStream.on('error', (error) => {
        reject(error);
      });
    });
    return result;
  } catch (error) {
    displayError();
  }
};