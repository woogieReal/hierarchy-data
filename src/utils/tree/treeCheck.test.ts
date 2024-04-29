import { describe, expect, test } from "@jest/globals";
import { checkRootTree, checkDirectoryTree, checkFileTree, checkSameTreeDepth } from './treeCheck';
import { BasicTree, ChildTree, RootTree } from "../../types";

describe("treeCheck", () => {
  describe("checkRootTree", () => {
    test("return true, if given tree is a root tree", () => {
      const tree: BasicTree = {
        isRoot: true,
        type: 'directory',
      }
      const res = checkRootTree(tree);
      expect(res).toBe(true);
    });

    test("return false, if given tree is not a root tree", () => {
      const tree: BasicTree = {
        isRoot: false,
        type: 'directory',
      }
      const res = checkRootTree(tree);
      expect(res).toBe(false);
    });
  });

  describe("checkDirectoryTree", () => {
    test("return true, if given tree's type is directory", () => {
      const tree: BasicTree = {
        isRoot: false,
        type: 'directory',
      }
      const res = checkDirectoryTree(tree);
      expect(res).toBe(true);
    });

    test("return false, if given tree's type is not directory", () => {
      const tree: BasicTree = {
        isRoot: false,
        type: 'file',
      }
      const res = checkDirectoryTree(tree);
      expect(res).toBe(false);
    });
  });

  describe("checkFileTree", () => {
    test("return true, if given tree's type is file", () => {
      const tree: BasicTree = {
        isRoot: false,
        type: 'file',
      }
      const res = checkFileTree(tree);
      expect(res).toBe(true);
    });

    test("return false, if given tree's type is not file", () => {
      const tree: BasicTree = {
        isRoot: false,
        type: 'directory',
      }
      const res = checkFileTree(tree);
      expect(res).toBe(false);
    });
  });

  describe("checkSameTreeDepth", () => {
    test("return true, if given trees are root tree", () => {
      const firstTree: RootTree = {
        isRoot: true,
        type: "directory",
        children: []
      }
      const secondTree: RootTree = {
        isRoot: true,
        type: "directory",
        children: [],
      }
      const res = checkSameTreeDepth(firstTree, secondTree);
      expect(res).toBe(true);
    });

    test("return true, if given trees are same depth", () => {
      const firstTree: ChildTree = {
        isRoot: false,
        type: "directory",
        id: 10,
        name: 'second tree',
        path: '',
        children: []
      }
      const secondTree: ChildTree = {
        isRoot: false,
        type: "file",
        id: 20,
        name: 'first tree',
        content: 'first tree content',
        path: '',
      }
      const res = checkSameTreeDepth(firstTree, secondTree);
      expect(res).toBe(true);
    });

    test("return true, if one of the given trees is root tree", () => {
      const firstTree: RootTree = {
        isRoot: true,
        type: "directory",
        children: []
      }
      const secondTree: ChildTree = {
        isRoot: false,
        type: "file",
        id: 20,
        name: 'first tree',
        content: 'first tree content',
        path: '',
      }
      const res = checkSameTreeDepth(firstTree, secondTree);
      expect(res).toBe(false);
    });

    test("return false, if given trees are not same depth", () => {
      const firstTree: ChildTree = {
        isRoot: false,
        type: "directory",
        id: 10,
        name: 'second tree',
        path: '',
        children: []
      }
      const secondTree: ChildTree = {
        isRoot: false,
        type: "file",
        id: 20,
        name: 'first tree',
        content: 'first tree content',
        path: '5',
      }
      const res = checkSameTreeDepth(firstTree, secondTree);
      expect(res).toBe(false);
    });
  });
});
