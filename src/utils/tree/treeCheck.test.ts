import { describe, expect, test } from "@jest/globals";
import { checkRootTree, checkDirectoryTree, checkFileTree } from './treeCheck';
import { CommonTree } from "../../types";

describe("treeCheck", () => {
  describe("checkRootTree", () => {
    test("return true, if given tree is a root tree", () => {
      const tree: CommonTree = {
        isRoot: true,
        type: 'directory',
      }
      const res = checkRootTree(tree);
      expect(res).toBe(true);
    });

    test("return false, if given tree is not a root tree", () => {
      const tree: CommonTree = {
        isRoot: false,
        type: 'directory',
      }
      const res = checkRootTree(tree);
      expect(res).toBe(false);
    });
  });

  describe("checkDirectoryTree", () => {
    test("return true, if given tree's type is directory", () => {
      const tree: CommonTree = {
        isRoot: false,
        type: 'directory',
      }
      const res = checkDirectoryTree(tree);
      expect(res).toBe(true);
    });

    test("return false, if given tree's type is not directory", () => {
      const tree: CommonTree = {
        isRoot: false,
        type: 'file',
      }
      const res = checkDirectoryTree(tree);
      expect(res).toBe(false);
    });
  });

  describe("checkFileTree", () => {
    test("return true, if given tree's type is file", () => {
      const tree: CommonTree = {
        isRoot: false,
        type: 'file',
      }
      const res = checkFileTree(tree);
      expect(res).toBe(true);
    });

    test("return false, if given tree's type is not file", () => {
      const tree: CommonTree = {
        isRoot: false,
        type: 'directory',
      }
      const res = checkFileTree(tree);
      expect(res).toBe(false);
    });
  });
});
