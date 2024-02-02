import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getMessage(message) {
  console.log(`${message}`);
}

function parsArguments() {
  const argument = process.argv[2];
  if (argument) {
    return argument.replace('--username=', '');
  }
}
const parsedArgument = parsArguments();

const userName = parsedArgument? parsedArgument : "Unknown user";

let currentDirectory = process.cwd();

rl.on('SIGINT', () => {
  exitCommandLine();
});

console.log(`Welcome to the File Manager ${userName}!`);
console.log(`You are currently in ${currentDirectory}`);

function outputProcess() {
  rl.question('', (input) => {
    inputUserCommand(input);
  });
}
outputProcess();


function exitCommandLine() {
  console.log(
    `\n Thank you for using File Manager, ${userName}, goodbye! \n`,
  );
  rl.close();
  process.exit();
}
import path from 'path';

function upDirectory() {
  let parentDirectory = path.resolve(currentDirectory, '..');
  if (path.relative(parentDirectory, path.sep) === '') {
    console.log('Cannot go above the root directory.');
  } else {
    currentDirectory = parentDirectory;
  }
}

async function inputUserCommand(input) {
  const command = input;
  switch(command) {
    case '.exit':
      exitCommandLine()
    case '':
      getMessage('Invalid empty input.Please enter a command.');
      outputProcess();
      break
    case 'up':
    case 'cd..':
      upDirectory();
      getMessage(`You are currently in ${currentDirectory}`);
      outputProcess();
      break;
    default:
      getMessage(`Unknown operation "${command}"`);
      outputProcess();
      break;
  }
}
