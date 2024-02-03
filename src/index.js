import { upDirectory } from './up/upDirectory.js';
import { cdDirectory } from './cd/cdDirectory.js';
import { exitSignin, exitCommandLine } from './exit/exitCommandLine.js';
import { getUserName } from './utils/userName.js';
import { askUserInput } from './utils/askUserInput.js';

async function start() {
  const userName = getUserName();
  exitSignin();

  let currentDirectory = process.cwd();
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
