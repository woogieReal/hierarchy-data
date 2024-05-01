export type HierarchyConfig = {
  [key: string]: string;
}

export interface Tree {
  id: string;
  name: string;
  content?: any;
  path: string;
  children?: Tree[];
}
