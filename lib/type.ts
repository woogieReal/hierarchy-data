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
