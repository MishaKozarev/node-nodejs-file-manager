import fs, { promises as fsPromises } from 'fs';
import path, { resolve as resolveToPath } from 'path';
import { displayError } from '../utils/displayError.js';

export const mvCommand = async (args) => {
  try {
    const pathToCurrentFile = resolveToPath(args[0]);
    const pathToNewDirectory = resolveToPath(args[1]);

    if (!pathToNewDirectory) {
      throw new Error();
    }

    const readableStream = fs.createReadStream(pathToCurrentFile, {
      encoding: 'utf-8',
    });

    const result = new Promise((resolve, reject) => {
      let data = '';

      readableStream.on('data', (chunk) => {
        data += chunk;
      });
      readableStream.on('end', () => {
        const writableStream = fs.createWriteStream(
          resolveToPath(pathToNewDirectory, path.basename(pathToCurrentFile)),
        );
        writableStream.end(data);

        writableStream.on('finish', async () => {
          await fsPromises.unlink(pathToCurrentFile);
          console.log(`The file has been moved to ${pathToNewDirectory}`);

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