import { Tree } from '../../types';
import _ from 'lodash';

const TEMP_ROOT_TREE: Tree = {
  id: '',
  name: '',
  content: '',
  path: '',
  children: [],
}

export const createTempRootTree = _.constant(TEMP_ROOT_TREE);

export const getTreeDepth = <T extends Tree>(tree: T): number => getTreePathArray(tree.path).length;

export const getTreePathArray = (path: string): string[] => {
  return path
    .split('|')
    .filter(path => !!path);
}

export const sortingTreeByTreeName = <T extends Tree>(a: T, b: T) => {
  const nameA = a.name;
  const nameB = b.name;

  if (nameA < nameB) {
    return -1;
  } else if (nameA > nameB) {
    return 1;
  } else {
    return 0;
  }
};

export const checkSameTreeDepth = <T extends Tree>(firstTree: T, secondTree: T): boolean => {
  return getTreeDepth(firstTree) === getTreeDepth(secondTree);
}

export const getTreeParentPath = <T extends Tree>(tree: T): string => {
  const treePathArr = getTreePathArray(tree.path);
  const parentPathArr = treePathArr.slice(0, treePathArr.length - 1);
  return parentPathArr.join('|');
}
