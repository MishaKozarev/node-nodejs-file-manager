import os from 'os';
import { upDirectory } from './up/upDirectory.js';
import { cdDirectory } from './cd/cdDirectory.js';
import { displayFilesAndFolders } from './ls/listOfFilesAndFolders.js';
import { exitSignin, exitCommandLine } from './exit/exitCommandLine.js';
import { getUserName } from './utils/userName.js';
import { askUserInput } from './utils/askUserInput.js';
import { catCommand as readFile } from './basic/cat.js';
import { addCommand as addFile } from './basic/add.js';
import { rnCommand as renameFile } from './basic/rn.js';
import { cpCommand as copyFile } from './basic/cp.js';
import { mvCommand as moveFile } from './basic/mv.js';
import { rmCommand as removeFile } from './basic/rm.js';
import { osCommand as getDataOs } from './os/os.js';
import { hashCommand as getHash } from './hash/hash.js';
import { compressCommand as compressFile } from './zip/compress.js';
import { decompressCommand as decompressFile } from './zip/decompress.js';

async function start() {
  const userName = getUserName();
  exitSignin();

  let currentDirectory = os.homedir() ;
  let targetDirectory;

  console.log(`Welcome to the File Manager ${userName}!`);
  console.log(`You are currently in ${currentDirectory}`);


  while(true) {
    try {
      const userInputValue = await askUserInput('> ');
      const [command, ...userArguments] = userInputValue.split(" ");
      switch(command) {
        case '.exit':
          exitCommandLine();
          break;
        case '':
          console.log('Invalid empty input.Please enter a command.');
          break;
        case 'up':
        case 'cd..':
          targetDirectory = await upDirectory(currentDirectory);
          if (targetDirectory) {
            currentDirectory = targetDirectory;
          }
          break;
        case 'cd':
          targetDirectory = await cdDirectory(currentDirectory, userArguments.join(' '));
          if (targetDirectory) {
            currentDirectory = targetDirectory;
          }
          break;
        case 'ls':
          await displayFilesAndFolders(currentDirectory);
          break;
        case 'cat':
          await readFile(userArguments.join(' '));
          break;
        case 'add':
          await addFile(userArguments.join(' '), currentDirectory);
          break;
        case 'rn':
          await renameFile(userArguments);
          break;
        case 'cp':
          await copyFile(userArguments);
          break;
        case 'mv':
          await moveFile(userArguments);
          break;
        case 'rm':
          await removeFile(...userArguments);
          break;
        case 'os':
          await getDataOs(...userArguments);
          break;
        case 'hash':
          await getHash(...userArguments);
          break;
        case 'compress':
          await compressFile(userArguments);
          break;
        case 'decompress':
          await decompressFile(userArguments);
          break;
        default:
          console.log(`Unknown operation "${command}"`);
          break;
      }
      console.log(`You are currently in ${currentDirectory}`);
    } catch {
      console.error(`Operation failed`);
    }
  }
}
export default start();
