import fs from 'fs';
import zlib from 'zlib';
import path, { resolve } from 'path';
import { pipeline } from 'stream/promises';
import { displayError } from '../utils/displayError.js';

export const decompressCommand = async (args) => {
  try {
    const br = '.br';
    let pathToFile = args[0];
    let newPathToFile;

    if (!args[1]) {
      newPathToFile = path.dirname(pathToFile);
    } else {
      newPathToFile = args[1];
    }

    let newFileName = path.basename(pathToFile);
    if (newFileName.endsWith(br)) {
      newFileName = newFileName.slice(0, -br.length);
    }

    const pathToNewFile = resolve(newPathToFile, newFileName);

    const inputStream = fs.createReadStream(pathToFile);

    const brotliCompress = zlib.createBrotliDecompress();

    const outputStream = fs.createWriteStream(pathToNewFile);

    await pipeline(inputStream, brotliCompress, outputStream);

    console.log(`File decompressed to "${pathToNewFile}"`);
  } catch (error) {
    displayError();
  }
};