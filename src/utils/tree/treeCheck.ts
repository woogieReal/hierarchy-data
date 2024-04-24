import { BasicTree, ChildTree } from '../../types';
import { getTreeDepth } from './treeUtil';

type CheckTreeFn = (targetTree: BasicTree) => boolean;
type CheckCompareTreesFn = (firstTree: ChildTree, secondTree: ChildTree) => boolean;

export const checkRootTree: CheckTreeFn = tree => tree.isRoot;
export const checkDirectoryTree: CheckTreeFn = tree => tree.type === 'directory';
export const checkFileTree: CheckTreeFn = tree => tree.type === 'file';
export const checkSameTreeDepth: CheckCompareTreesFn = (firstTree, secondTree) => getTreeDepth(firstTree) === getTreeDepth(secondTree);