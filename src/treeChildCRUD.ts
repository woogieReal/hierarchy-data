import { RootTree, ChildTree } from './types';
import { pipe } from 'fp-ts/lib/function';
import _ from 'lodash';
import { getEmptyArrayIfNotArray } from './utils/common/arrayUtil';
import { sortingTreeByTreeName } from './utils/tree/treeUtil';

type CUDFromParentFn = (parentTree: RootTree | ChildTree, childTree: ChildTree) => RootTree | ChildTree;
type RFromParentFn = (parentTree: RootTree | ChildTree, childTreeId: number | string) => ChildTree | undefined;

export const addChildToParent: CUDFromParentFn = (parentTree, childTree) => {
  const copyParentTree = _.cloneDeep(parentTree);
  
  copyParentTree.children = getEmptyArrayIfNotArray(copyParentTree.children);
  copyParentTree.children.push(childTree);
  copyParentTree.children.sort(sortingTreeByTreeName);

  return copyParentTree;
}

export const findChildFromParentById: RFromParentFn = (parentTree, childTreeId) => _.find(parentTree.children, { 'id': childTreeId });

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