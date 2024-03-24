import findup from 'findup-sync';
import fs from 'fs';
import { Config } from './type';

export const getConfig = (): Config => {
  const configFileFullPath = findup('hierarchy-data.json');

  if (!configFileFullPath) {
    throw new Error('Configuration file does not exist.');
  }
  
  const jsonContents = fs.readFileSync(configFileFullPath).toString();
  const confjg: Config = JSON.parse(jsonContents);

  return confjg;
}