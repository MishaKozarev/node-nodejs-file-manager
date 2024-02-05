import os from 'os';
import { displayError } from '../utils/displayError.js';


export async function osCommand(args) {
  try {
    switch (args) {
      case '--EOL':
        console.log(`End-Of-Line: ${JSON.stringify(os.EOL)}`);
        break;
      case '--cpus':
        let cpus = os.cpus();
        cpus = cpus.map((cpusModel) => ({
          Model: cpusModel.model,
          'Clock rate': `${(cpusModel.speed / 1000).toFixed(2)} GHz`,
        }));
        console.log(`CPUS count: ${cpus.length}`);
        console.table(cpus);
        break;
      case '--homedir':
        const homeDirectory = os.homedir();
        console.log(`Home directory: ${homeDirectory}`);
        break;
      case '--username':
        console.log(`Current username: ${os.userInfo().username}`);
        break;
      case '--architecture':
        console.log(`CPU architecture: ${os.arch()}`);
        break;
      default:
        console.error(`Invalid input`);
        break;
    }
  } catch (error) {
    displayError();
  }
}