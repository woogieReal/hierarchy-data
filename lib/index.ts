import findup from 'findup-sync';
import fs from 'fs';

export const getConfig = () => {
  const configFileFullPath = findup('hierarchy-data.json');

  if (!configFileFullPath) {
    throw new Error('Configuration file does not exist.');
  }
  
  const jsonContents = fs.readFileSync(configFileFullPath).toString();
  const confjg = JSON.parse(jsonContents);

  return confjg;
}