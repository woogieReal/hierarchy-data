export type HierarchyConfig = {
  [key: string]: string;
}

export type TreeType = "directory" | "file";

export interface BasicTree {
  isRoot: boolean;
  type: TreeType;
}

export interface RootTree extends BasicTree {
  isRoot: true;
  type: "directory";
  children: ChildTree[];
}

export interface ChildTree extends BasicTree {
  isRoot: false;
  type: TreeType;
  id: string | number;
  name: string;
  content?: any;
  path: string;
  children?: ChildTree[];
}
