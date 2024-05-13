import { Tree } from './types';
import _ from 'lodash';
import { getTreePathArray, getTreeParentPath, sortingTreeByTreeName } from './utils/tree/treeUtil';
import * as O from 'fp-ts/Option'
import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import { addChildToParent, removeChildFromParentCR, replaceChildFromParent } from './treeChildCRUD';

export const addTreeToUpper = <T extends Tree>(upperTrees: T | T[], lowerTree: T): T | T[] => {
  const trees = _.concat([], _.cloneDeep(upperTrees));
  const parentTree = findTreeFromUpper(trees, getTreeParentPath(lowerTree));

  if (parentTree) {
    const p = addChildToParent(parentTree, lowerTree);
    const r = replaceTreeFromUpper(trees, p);
    return Array.isArray(upperTrees) ? r : _.concat([], r)[0];
  } else {
    return Array.isArray(upperTrees) ? _.concat(trees, lowerTree).sort(sortingTreeByTreeName) : addChildToParent(trees[0], lowerTree);
  }
}

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

export const replaceTreeFromUpper = <T extends Tree>(upperTrees: T | T[], lowerTree: T): T | T[] => {
  const trees = _.concat([], _.cloneDeep(upperTrees));
  const idx = trees.findIndex(tree => tree.id === lowerTree.id);

  return pipe(
    idx < 0,
    B.match(
      () => {
        trees[idx] = lowerTree;
        return Array.isArray(upperTrees) ? trees.sort(sortingTreeByTreeName) : trees[0];
      },
      () => {
        const parentTreePath = getTreeParentPath(lowerTree);
        return pipe(
          O.fromNullableK(findTreeFromUpper)(trees, parentTreePath),
          O.match(
            () => Array.isArray(upperTrees) ? trees : trees[0],
            (parentTree) => {
              const updatedParent = replaceChildFromParent(parentTree, lowerTree);
              return replaceTreeFromUpper(upperTrees, updatedParent);
            },
          )
        )
      },
    ) as any
  );
}

export const removeTreeFromUpper = <T extends Tree>(upperTrees: T | T[], lowerTree: T) => {
  const trees = _.concat([], _.cloneDeep(upperTrees));
  const idx = trees.findIndex(tree => tree.id === lowerTree.id);

  return pipe(
    idx < 0,
    B.match(
      () => {
        _.remove(trees, (_, i) => i === idx);
        return Array.isArray(upperTrees) ? trees : trees[0];
      },
      () => {
        const parentTreePath = getTreeParentPath(lowerTree);
        return pipe(
          O.fromNullableK(findTreeFromUpper)(trees, parentTreePath),
          O.match(
            () => Array.isArray(upperTrees) ? trees : trees[0],
            (parentTree) => pipe(
              parentTree,
              removeChildFromParentCR(lowerTree),
              replaceTreeFromUpperCL(trees),
            ),
          )
        )
      },
    )    
  )
}

const replaceTreeFromUpperCL = _.curry(replaceTreeFromUpper);