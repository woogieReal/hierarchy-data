import { describe, expect, test } from "@jest/globals";
import { checkSameTreeDepth, createTempRootTree, getTreeDepth, getTreePathArray, sortingTreeByTreeName } from './treeUtil';
import { Tree } from "../../types";

describe("treeUtil", () => {
  describe("createTempRootTree", () => {
    test("return temporary root tree", () => {
      const result = createTempRootTree();
      const expectValue: ReturnType<typeof createTempRootTree> = {
        id: '',
        name: '',
        content: '',
        path: '',
        children: [],
      };
      // If it should pass with deep equality, replace "toBe" with "toStrictEqual"
      expect(result).toStrictEqual(expectValue);
    });
  });

  describe("getTreeDepth", () => {
    test("return 1 if given tree's demth is 1 ", () => {
      const tree: Tree = {
        id: '10',
        name: 'tree',
        path: '10',
      }
      const result = getTreeDepth(tree);
      const expectValue: ReturnType<typeof getTreeDepth> = 1;
      expect(result).toBe(expectValue);
    });

    test("return 2 if given tree's depth is 2 ", () => {
      const tree: Tree = {
        id: '20',
        name: 'tree',
        content: 'tree content',
        path: '10|15',
      }
      const result = getTreeDepth(tree);
      const expectValue: ReturnType<typeof getTreeDepth> = 2;
      expect(result).toBe(expectValue);
    });
  });

  describe("getTreePathArray", () => {
    test("return tree path array", () => {
      const tree: Tree = {
        id: '20',
        name: 'tree',
        content: 'tree content',
        path: '10|20',
      }
      const result = getTreePathArray(tree.path);
      const expectValue: ReturnType<typeof getTreePathArray> = ['10', '20'];
      expect(result).toStrictEqual(expectValue);
    });
  });

  describe("sortingTreeByTreeName", () => {
    describe("return -1 if first tree's order is faster than second tree's", () => {
      test("first tree's name is aaa, second tree's name is bbb", () => {
        const firstTree: Tree = {
          id: '10',
          name: 'aaa',
          content: 'first tree content',
          path: '',
        }
        const secondTree: Tree = {
          id: '20',
          name: 'bbb',
          content: 'second tree content',
          path: '',
        }
        const result = sortingTreeByTreeName(firstTree, secondTree);
        const expectValue: ReturnType<typeof sortingTreeByTreeName> = -1;
        expect(result).toBe(expectValue);
      });
    })

    describe("return 1 if first tree's order is later than second tree's", () => {
      test("first tree's name is bbb, second tree's name is aaa", () => {
        const firstTree: Tree = {
          id: '10',
          name: 'bbb',
          content: 'first tree content',
          path: '',
        }
        const secondTree: Tree = {
          id: '20',
          name: 'aaa',
          content: 'second tree content',
          path: '',
        }
        const result = sortingTreeByTreeName(firstTree, secondTree);
        const expectValue: ReturnType<typeof sortingTreeByTreeName> = 1;
        expect(result).toBe(expectValue);
      });
    });
  });

  describe("checkSameTreeDepth", () => {
    test("return true, if given trees are same depth", () => {
      const firstTree: Tree = {
        id: '10',
        name: 'second tree',
        path: '10',
        children: []
      }
      const secondTree: Tree = {
        id: '20',
        name: 'first tree',
        content: 'first tree content',
        path: '20',
      }
      const res = checkSameTreeDepth(firstTree, secondTree);
      expect(res).toBe(true);
    });

    test("return false, if given trees are not same depth", () => {
      const firstTree: Tree = {
        id: '10',
        name: 'second tree',
        path: '10',
        children: []
      }
      const secondTree: Tree = {
        id: '20',
        name: 'first tree',
        content: 'first tree content',
        path: '5|20',
      }
      const res = checkSameTreeDepth(firstTree, secondTree);
      expect(res).toBe(false);
    });
  });
});
