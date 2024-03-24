import findup from 'findup-sync';
import fs from 'fs';

export type Config = {
  [key: string]: string;
}

export type TreeType = "root" | "child";

export interface CommonTree {
  type: TreeType;
  [key: string]: any;
}

export interface RootTree extends CommonTree {
  type: "root";
  children: ChildTree[];
}

export interface ChildTree extends CommonTree {
  type: "child";
  id: string | number;
  name: string;
  content?: any;
  path: string;
  children?: ChildTree[];
}

export const getConfig = (): Config => {
  const configFileFullPath = findup('hierarchy-data.json');

  if (!configFileFullPath) {
    throw new Error('Configuration file does not exist.');
  }
  
  const jsonContents = fs.readFileSync(configFileFullPath).toString();
  const confjg: Config = JSON.parse(jsonContents);

  return confjg;
}