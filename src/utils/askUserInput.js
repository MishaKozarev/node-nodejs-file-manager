import { rl } from './readlineInterface.js';
import { promisify } from 'util';

const question = promisify(rl.question).bind(rl);
export async function askUserInput(prompt) {
  return await question(prompt);
}