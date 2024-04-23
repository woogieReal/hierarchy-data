import findup from 'findup-sync';
import fs from 'fs';
import { HierarchyConfig } from './types';

export const getConfig = (): HierarchyConfig => {
  const configFileFullPath = findup('hierarchy-data.json');

  if (!configFileFullPath) {
    throw new Error('Configuration file does not exist.');
  }
  
  const jsonContents = fs.readFileSync(configFileFullPath).toString();
  const confjg: HierarchyConfig = JSON.parse(jsonContents);

  return confjg;
}