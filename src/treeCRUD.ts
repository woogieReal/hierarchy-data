import { Tree } from './types';
import _ from 'lodash';
import { getTreePathArray, checkSameTreeDepth, createTempRootTree } from './utils/tree/treeUtil';
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import { addChildToParentCR, findChildFromParentById, removeChildFromParentCR, replaceChildFromParent } from './treeChildCRUD';

type CUDFromRootFn = <T extends Tree>(upperTree: T, lowerTree: T) => T;

// export const addTreeToUpper: CUDFromRootFn = (upperTree, lowerTree) => pipe(
//   O.fromNullableK(findTreeFromUpper)(upperTree, getTreePathArray(lowerTree.path)),
//   E.fromOption(() => upperTree),
//   E.toUnion,
//   addChildToParentCR(lowerTree),
//   replaceTreeFromUpperCL(upperTree),
// );

export const findTreeFromUpper = <T extends Tree>(upperTrees: T | T[], path: string): T | undefined => {
  const trees = _.concat([], upperTrees);
  const pathArr = getTreePathArray(path);
  const upper = _.find(trees, { 'id': pathArr.shift() }) as T | undefined;

  return pipe(
    O.fromNullable(upper),
    O.match(
      () => undefined,
      (upper) => pipe(
        _.isEmpty(pathArr),
        B.match(
          () => findTreeFromUpper(upper.children as T[], pathArr.join('|')),
          () => upper,
        )
      ),
    )
  )
}

// export const replaceTreeFromUpper: CUDFromRootFn = (upperTree, lowerTree) => pipe(
//   !checkSameTreeDepth(upperTree, lowerTree),
//   B.match(
//     () => _.cloneDeep(lowerTree),
//     () => pipe(
//       O.fromNullableK(findTreeFromUpper)(upperTree, getTreePathArray(lowerTree.path)),
//       O.match(
//         () => _.cloneDeep(upperTree),
//         (parentTree) => pipe(
//           replaceChildFromParent(parentTree, lowerTree),
//           replaceTreeFromUpperCL(upperTree),
//         )
//       )
//     ),
//   ),
// );

// export const removeTreeFromUpper: CUDFromRootFn = (upperTree, lowerTree) => pipe(
//   O.fromNullableK(findTreeFromUpper)(upperTree, getTreePathArray(lowerTree.path)),
//   O.match(
//     () => upperTree,
//     (parentTree) => pipe(
//       parentTree,
//       removeChildFromParentCR(lowerTree),
//       replaceTreeFromUpperCL(upperTree),
//     )
//   )
// );

// const replaceTreeFromUpperCL = _.curry(replaceTreeFromUpper);