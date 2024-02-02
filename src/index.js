import os from 'os';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function parsArguments() {
  const argument = process.argv[2];
  if (argument) {
    return argument.replace('--username=', '');
  }
}
const parsedArgument = parsArguments();

const userName = parsedArgument? parsedArgument : "Unknown user";

const pathToWorkingDirectory = os.homedir();

rl.on('SIGINT', () => {
  console.log(
    `\n Thank you for using File Manager, ${userName}, goodbye! \n`,
  );
  rl.close();
  process.exit();
});

console.log(`Welcome to the File Manager ${userName}!`);
console.log(`You are currently in ${pathToWorkingDirectory}`);