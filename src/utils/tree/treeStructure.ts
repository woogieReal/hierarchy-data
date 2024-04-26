import { RootTree, ChildTree } from '../../types';
import _ from 'lodash';
import { getEmptyArrayIfNotArray } from '../common/arrayUtil';
import { getTreeDepth, getTreePathArray, createInitialRootTree, sortingTreeByTreeName } from './treeUtil';

export const createDepthToTreesMap = (trees: ChildTree[]): Map<number, ChildTree[]> => {
  const depthToTree = new Map<number, ChildTree[]>();

  const maxDepthTree = _.maxBy(trees, getTreeDepth)
  const maxDepth = maxDepthTree ? getTreeDepth(maxDepthTree) : 0;

  for (let i = 0; i <= maxDepth; i++) {
    const iDepthTrees = _
      .chain(trees)
      .filter((tree) => getTreeDepth(tree) === i)
      .value();

    depthToTree.set(i, iDepthTrees);
  }

  return depthToTree;
}

export const makeTreeStructure = (depthToTreesMap: Map<number, ChildTree[]>): RootTree => {
  const treeStructureMap = new Map<number, ChildTree[]>();
  const maxDepth = _.maxBy(Array.from(depthToTreesMap.keys())) || 0;

  for (let i = 1; i <= maxDepth; i++) {
    const childTrees: ChildTree[] = depthToTreesMap.get(i) || [];
    const parentTrees: ChildTree[] = depthToTreesMap.get(i - 1) || [];

    childTrees.forEach((child: ChildTree) => {
      const parentTreeId = getTreePathArray(child.path).pop();
      const parentTree = parentTrees.find((parent) => String(parent.id) === String(parentTreeId));

      if (parentTree) {
        parentTree.children = getEmptyArrayIfNotArray(parentTree.children);
        parentTree.children.push(child);
      }
    });

    treeStructureMap.set(i - 1, parentTrees);    
  }

  return { ...createInitialRootTree(), children: treeStructureMap.get(0) || [] };
}

export const sortingTreeFromRootToLeef = <T extends RootTree | ChildTree>(tree: T): T => {
  const copyTree = _.cloneDeep(tree);

  if (copyTree.type === 'directory') {
    copyTree.children = getEmptyArrayIfNotArray(copyTree.children);
    copyTree.children.sort(sortingTreeByTreeName);
  
    copyTree.children.forEach((child, idx, children) => children[idx] = sortingTreeFromRootToLeef(child));
  }

  return copyTree;
}

export const createTreeStructureFromTrees = _.flow([
  createDepthToTreesMap,
  makeTreeStructure,
  sortingTreeFromRootToLeef,
]);
