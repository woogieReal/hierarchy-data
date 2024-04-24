import { RootTree, ChildTree } from '../../types';
import _ from 'lodash';

const InitialRootTree: RootTree = {
  isRoot: true,
  type: "directory",
  children: [],
}

export const createInitialRootTree = _.constant(InitialRootTree);

export const createTreeFullPath = (tree: ChildTree): string => {
  return tree.path
    ? tree.path + '|' + tree.id
    : String(tree.id);
};

export const getTreeDepth = (tree: ChildTree): number => {
  return getTreePathArray(tree.path).length;
}

export const getTreePathArray = (path: string): number[] | string[] => {
  return path
    .split('|')
    .filter(path => !!path);
}

export const sortingTreeByTreeName = (a: ChildTree, b: ChildTree) => {
  const aTypeToNumber = a.type === 'directory' ? 0 : 1;
  const bTypeToNumber = b.type === 'directory' ? 0 : 1;

  if (aTypeToNumber < bTypeToNumber) {
    return -1;
  } else if (aTypeToNumber > bTypeToNumber) {
    return 1;
  } else {
    const nameA = a.name;
    const nameB = b.name;

    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  }
};
