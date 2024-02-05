import fs from 'fs';
import zlib from 'zlib';
import path, { resolve } from 'path';
import { pipeline } from 'stream/promises';
import { displayError } from '../utils/displayError.js';

export const compressCommand = async (args) => {
  try {
    const br = '.br';
    let pathToCurrentFile = resolve(args[0]);
    let newFileName;

    if (!args[1]) {
      newFileName = path.dirname(pathToCurrentFile);
    } else {
      newFileName = resolve(args[1]);
    }

    const pathToNewFile = resolve(
      newFileName,
      `${path.basename(pathToCurrentFile)}${br}`,
    );

    const inputStream = fs.createReadStream(pathToCurrentFile, { encoding: 'utf-8' });

    const outputStream = fs.createWriteStream(pathToNewFile);

    const brotliCompress = zlib.createBrotliCompress();

    await pipeline(inputStream, brotliCompress, outputStream);

    console.log(`File compressed to "${newFileName}"`);
  } catch (error) {
    displayError();
  }
};