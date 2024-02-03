import fs from 'fs/promises';
import { displayError } from '../utils/displayError.js'

export const displayFilesAndFolders = async (currentDirectory) => {
  try {
    let listFilesAndFolders = [];

    const items = await fs.readdir(currentDirectory, { withFileTypes: true });
    items.forEach((item) => {
      if (item.isFile()) {
        listFilesAndFolders.push({ Name: item.name, Type: 'file' });
      } else {
        listFilesAndFolders.push({ Name: item.name, Type: 'directory' });
      }
    });
    console.table(listFilesAndFolders);

    const sortedListFilesAndFolders = files.sort((a, b) => {
      if (a.Type === b.Type) {
        return a.Name.localeCompare(b.Name);
      } else if (a.Type === 'directory') {
        return -1;
      } else {
        return 1;
      }
    });

    console.table(sortedListFilesAndFolders);
  } catch {
    displayError();
  }
};