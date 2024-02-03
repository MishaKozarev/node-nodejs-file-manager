import { rl } from '../utils/readlineInterface.js';
import { getUserName } from '../utils/userName.js';

export function exitCommandLine() {
  const userName = getUserName();
  console.log(
    `\n Thank you for using File Manager, ${userName}, goodbye! \n`,
  );
  rl.close();
  process.exit();
}

export function exitSignin() {
  rl.on('SIGINT', () => {
    exitCommandLine();
  });
}