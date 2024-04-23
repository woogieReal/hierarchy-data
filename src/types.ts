export type HierarchyConfig = {
  [key: string]: string;
}

export type TreeType = "directory" | "file";

export interface CommonTree {
  isRoot: boolean;
  type: TreeType;
  [key: string]: any;
}

export interface RootTree extends CommonTree {
  isRoot: true;
  type: "directory";
  children: ChildTree[];
}

export interface ChildTree extends CommonTree {
  isRoot: false;
  type: "file";
  id: string | number;
  name: string;
  content?: any;
  path: string;
  children?: ChildTree[];
}
