import { BasicTree, ChildTree, RootTree } from '../../types';
import { getTreeDepth } from './treeUtil';

type CheckTreeFn = (targetTree: BasicTree) => boolean;
type CheckCompareTreesFn = (firstTree: RootTree | ChildTree, secondTree: RootTree | ChildTree) => boolean;

export const checkRootTree: CheckTreeFn = tree => tree.isRoot;
export const checkDirectoryTree: CheckTreeFn = tree => tree.type === 'directory';
export const checkFileTree: CheckTreeFn = tree => tree.type === 'file';
export const checkSameTreeDepth: CheckCompareTreesFn = (firstTree, secondTree) => {
  if (firstTree.isRoot && secondTree.isRoot) return true;
  else if (firstTree.isRoot || secondTree.isRoot) return false;
  else return getTreeDepth(firstTree) === getTreeDepth(secondTree);
}