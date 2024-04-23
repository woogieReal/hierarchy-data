import {
  TreeType,
  CommonTree,
  RootTree,
  ChildTree,
} from '../../types';

import { checkEmptyValue } from '../common/commonUtil';
// import { getTreeDepth } from './treeUtil';

type CheckTreeFn = (targetTree: CommonTree) => boolean;
type CheckCompareTreesFn = (firstTree: CommonTree, secondTree: CommonTree) => boolean;

export const checkRootTree: CheckTreeFn = tree => tree.isRoot;
export const checkDirectoryTree: CheckTreeFn = tree => tree.type === 'directory';
export const checkFileTree: CheckTreeFn = tree => tree.type === 'file';

// export const checkSameTreeDepth: CheckCompareTreesFn = (firstTree, secondTree) => {
//   return (
//     getTreeDepth(firstTree) === getTreeDepth(secondTree)
//     && checkInitalRootTree(firstTree) === checkInitalRootTree(secondTree)
//   );
// }