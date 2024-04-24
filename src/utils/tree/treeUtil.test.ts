import { describe, expect, test } from "@jest/globals";
import { createInitialRootTree, createTreeFullPath, getTreeDepth, getTreePathArray, sortingTreeByTreeName } from './treeUtil';
import { ChildTree, RootTree } from "../../types";

describe("treeUtil", () => {
  describe("createInitialRootTree", () => {
    test("return initial root tree", () => {
      const result = createInitialRootTree();
      const expectValue: ReturnType<typeof createInitialRootTree> = {
        isRoot: true,
        type: "directory",
        children: [],
      }
      // If it should pass with deep equality, replace "toBe" with "toStrictEqual"
      expect(result).toStrictEqual(expectValue);
    });
  });

  describe("createTreeFullPath", () => {
    test("return tree id if given tree's path is empty ", () => {
      const tree: ChildTree = {
        isRoot: false,
        type: "directory",
        id: 10,
        name: 'tree',
        path: '',
        children: []
      }
      const result = createTreeFullPath(tree);
      const expectValue: ReturnType<typeof createTreeFullPath> = String(tree.id);
      expect(result).toBe(expectValue);
    });

    test("return tree full path if given tree's path is not empty ", () => {
      const tree: ChildTree = {
        isRoot: false,
        type: "file",
        id: 20,
        name: 'tree',
        content: 'tree content',
        path: '10',
      }
      const result = createTreeFullPath(tree);
      const expectValue: ReturnType<typeof createTreeFullPath> = String(tree.path + '|' + tree.id);
      expect(result).toBe(expectValue);
    });
  });

  describe("getTreeDepth", () => {
    test("return 0 if given tree's path is empty ", () => {
      const tree: ChildTree = {
        isRoot: false,
        type: "directory",
        id: 10,
        name: 'tree',
        path: '',
        children: []
      }
      const result = getTreeDepth(tree);
      const expectValue: ReturnType<typeof getTreeDepth>  = 0;
      expect(result).toBe(expectValue);
    });

    test("return tree depth if given tree's path is not empty ", () => {
      const tree: ChildTree = {
        isRoot: false,
        type: "file",
        id: 20,
        name: 'tree',
        content: 'tree content',
        path: '10|15',
      }
      const result = getTreeDepth(tree);
      const expectValue: ReturnType<typeof getTreeDepth>  = 2;
      expect(result).toBe(expectValue);
    });
  });

  describe("getTreePathArray", () => {
    test("return empty array if given tree's path is empty ", () => {
      const tree: ChildTree = {
        isRoot: false,
        type: "directory",
        id: 10,
        name: 'tree',
        path: '',
        children: []
      }
      const result = getTreePathArray(tree.path);
      const expectValue: ReturnType<typeof getTreePathArray>  = [];
      expect(result).toStrictEqual(expectValue);
    });

    test("return tree depth if given tree's path is not empty ", () => {
      const tree: ChildTree = {
        isRoot: false,
        type: "file",
        id: 20,
        name: 'tree',
        content: 'tree content',
        path: '10|15',
      }
      const result = getTreePathArray(tree.path);
      const expectValue: ReturnType<typeof getTreePathArray>  = ['10', '15'];
      expect(result).toStrictEqual(expectValue);
    });
  });

  describe("sortingTreeByTreeName", () => {
    describe("return -1 if first tree's order is faster than second tree's", () => {
      test("first tree's type is directory, second tree's type is file", () => {
        const firstTree: ChildTree = {
          isRoot: false,
          type: "directory",
          id: 10,
          name: 'tree name',
          path: '',
          children: [],
        }
        const secondTree: ChildTree = {
          isRoot: false,
          type: "file",
          id: 20,
          name: 'tree name',
          content: 'second tree content',
          path: '',
        }
        const result = sortingTreeByTreeName(firstTree, secondTree);
        const expectValue: ReturnType<typeof sortingTreeByTreeName>  = -1;
        expect(result).toBe(expectValue);
      });

      test("first tree's name is aaa, second tree's name is bbb", () => {
        const firstTree: ChildTree = {
          isRoot: false,
          type: "file",
          id: 10,
          name: 'aaa',
          content: 'first tree content',
          path: '',
        }
        const secondTree: ChildTree = {
          isRoot: false,
          type: "file",
          id: 20,
          name: 'bbb',
          content: 'second tree content',
          path: '',
        }
        const result = sortingTreeByTreeName(firstTree, secondTree);
        const expectValue: ReturnType<typeof sortingTreeByTreeName>  = -1;
        expect(result).toBe(expectValue);
      });
    })

    describe("return 1 if first tree's order is later than second tree's", () => {
      test("first tree's type is file, second tree's type is directory", () => {
        const firstTree: ChildTree = {
          isRoot: false,
          type: "file",
          id: 10,
          name: 'tree name',
          path: '',
          children: [],
        }
        const secondTree: ChildTree = {
          isRoot: false,
          type: "directory",
          id: 20,
          name: 'tree name',
          content: 'second tree content',
          path: '',
        }
        const result = sortingTreeByTreeName(firstTree, secondTree);
        const expectValue: ReturnType<typeof sortingTreeByTreeName>  = 1;
        expect(result).toBe(expectValue);
      });

      test("first tree's name is bbb, second tree's name is aaa", () => {
        const firstTree: ChildTree = {
          isRoot: false,
          type: "file",
          id: 10,
          name: 'bbb',
          content: 'first tree content',
          path: '',
        }
        const secondTree: ChildTree = {
          isRoot: false,
          type: "file",
          id: 20,
          name: 'aaa',
          content: 'second tree content',
          path: '',
        }
        const result = sortingTreeByTreeName(firstTree, secondTree);
        const expectValue: ReturnType<typeof sortingTreeByTreeName>  = 1;
        expect(result).toBe(expectValue);
      });
    });
  });
});
