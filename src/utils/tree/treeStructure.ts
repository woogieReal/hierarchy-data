import { Tree } from '../../types';
import _ from 'lodash';
import { getEmptyArrayIfNotArray } from '../common/arrayUtil';
import { getTreeDepth, getTreePathArray, sortingTreeByTreeName } from './treeUtil';

export const createDepthToTreesMap = <T extends Tree>(trees: T[]): Map<number, T[]> => {
  const depthToTree = new Map<number, T[]>();

  const maxDepthTree = _.maxBy(trees, getTreeDepth)
  const maxDepth = maxDepthTree ? getTreeDepth(maxDepthTree) : 0;

  for (let i = 1; i <= maxDepth; i++) {
    const iDepthTrees = _
      .chain(trees)
      .filter((tree) => getTreeDepth(tree) === i)
      .value();

    depthToTree.set(i, iDepthTrees);
  }

  return depthToTree;
}

export const makeTreeStructure = <T extends Tree>(depthToTreesMap: Map<number, T[]>): T[] => {
  const treeStructureMap = new Map<number, T[]>();
  const maxDepth = _.maxBy(Array.from(depthToTreesMap.keys())) || 0;

  for (let i = 1; i < maxDepth; i++) {
    const childTrees: T[] = depthToTreesMap.get(i + 1) || [];
    const parentTrees: T[] = depthToTreesMap.get(i) || [];

    childTrees.forEach((child: T) => {
      const childTreePaths = getTreePathArray(child.path);
      const parentTreeId = childTreePaths[childTreePaths.length-2];
      const parentTree = parentTrees.find((parent) => parent.id === parentTreeId);

      if (parentTree) {
        parentTree.children = getEmptyArrayIfNotArray(parentTree.children);
        parentTree.children.push(child);
      }
    });

    treeStructureMap.set(i, parentTrees);    
  }

  return treeStructureMap.get(1) || [];
}

export const sortingTreeFromRootToLeef = <T extends Tree>(trees: T[]): T[] => {
  const copyTrees = _.cloneDeep(trees);
  copyTrees.forEach((t, i, list) => {
    copyTrees.sort(sortingTreeByTreeName);
    if (!!t.children?.length) {
      t.children.sort(sortingTreeByTreeName);
      list[i].children = sortingTreeFromRootToLeef(t.children || [])
    }
  });
  return copyTrees;
}

export const createTreeStructureFromTrees = _.flow([
  createDepthToTreesMap,
  makeTreeStructure,
  sortingTreeFromRootToLeef,
]);
