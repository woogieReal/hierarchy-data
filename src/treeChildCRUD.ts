import { Tree } from './types';
import { pipe } from 'fp-ts/lib/function';
import _ from 'lodash';
import { getEmptyArrayIfNotArray } from './utils/common/arrayUtil';
import { sortingTreeByTreeName } from './utils/tree/treeUtil';

type CUDFromParentFn = <T extends Tree>(parentTree: T, childTree: T) => T;

export const addChildToParent: CUDFromParentFn = (parentTree, childTree) => {
  const copyParentTree = _.cloneDeep(parentTree);
  
  copyParentTree.children = getEmptyArrayIfNotArray(copyParentTree.children);
  copyParentTree.children.push(childTree);
  copyParentTree.children.sort(sortingTreeByTreeName);

  return copyParentTree;
}

export const findChildFromParentById = <T extends Tree>(parentTree: T, childTreeId: string): T | undefined => {
  return _.find(parentTree.children, { 'id': childTreeId }) as T;
}

export const replaceChildFromParent: CUDFromParentFn = (parentTree, childTree) => pipe(
  parentTree,
  removeChildFromParentCR(childTree),
  addChildToParentCR(childTree),
);

export const removeChildFromParent: CUDFromParentFn = (parentTree, childTree) => {
  const copyParentTree = _.cloneDeep(parentTree);
  
  copyParentTree.children = copyParentTree.children?.filter(child => child.id !== childTree.id);

  return copyParentTree;
}

export const addChildToParentCR = _.curryRight(addChildToParent);
export const removeChildFromParentCR = _.curryRight(removeChildFromParent);