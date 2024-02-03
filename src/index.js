import readline from 'readline';
import { promisify } from 'util';
import  { upDirectory }  from './up/upDirectory.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const parsedArgument = process.argv[2]?.replace('--username=', '');

const userName = parsedArgument? parsedArgument : "Unknown user";

let currentDirectory = process.cwd();

const question = promisify(rl.question).bind(rl);
async function askUserInput(prompt) {
  return await question(prompt);
}



function exitCommandLine() {
  console.log(
    `\n Thank you for using File Manager, ${userName}, goodbye! \n`,
  );
  rl.close();
  process.exit();
}

async function start() {
  console.log(`Welcome to the File Manager ${userName}!`);
  console.log(`You are currently in ${currentDirectory}`);

  

  rl.on('SIGINT', () => {
    exitCommandLine();
  });
  while(true) {
    try {
      const userInputValue = await askUserInput('> ');
      const [command, ...userArgs] = userInputValue.split(" ");
      switch(command) {
        case '.exit':
          exitCommandLine();
          break;
        case '':
          console.log('Invalid empty input.Please enter a command.');
          break;
        case 'up':
        case 'cd..':
          const newDir = await upDirectory(currentDirectory);
          currentDirectory = newDir;
          break;
        default:
          console.log(`Unknown operation "${command}"`);
          break;
      }
    } catch {
      console.error(`Operation failed`);
    }
  }
}
export default start();
