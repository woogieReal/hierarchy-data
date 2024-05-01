import { beforeEach, describe, expect, test } from "@jest/globals";
import _ from 'lodash';
import {
  addChildToParent,
  findChildFromParentById,
  replaceChildFromParent,
  removeChildFromParent,
  addChildToParentCR,
  removeChildFromParentCR,
} from "./treeChildCRUD";
import { Tree } from "./types";

describe("treeChildCRUD", () => {
  let fileTree1: Tree;
  let fileTree2: Tree;
  let directoryTree: Tree;

  beforeEach(() => {
    fileTree1 = {
      id: '20',
      name: 'bbb',
      content: null,
      path: '10|20',
    };
    fileTree2 = {
      id: '30',
      name: 'aaa',
      content: null,
      path: '10|30',
    };
    directoryTree = {
      id: '10',
      name: 'directory',
      path: '10',
      children: []
    };
  })

  describe("addChildToParent", () => {
    test("add child tree to parent tree", () => {
      const result = addChildToParent(directoryTree, fileTree1);
      const expectValue: ReturnType<typeof addChildToParent> = {
        ...directoryTree,
        children: [fileTree1]
      };
      expect(result).toStrictEqual(expectValue);
    });

    test("add child tree to parent tree already has child tree", () => {
      directoryTree = {
        ...directoryTree,
        children: [fileTree1]
      }
      const result = addChildToParent(directoryTree, fileTree2);
      const expectValue: ReturnType<typeof addChildToParent> = {
        ...directoryTree,
        children: [fileTree2, fileTree1]
      };
      expect(result).toStrictEqual(expectValue);
    });
  })

  describe("findChildFromParentById", () => {
    test("return undefined when searching tree does not exist in parent tree", () => {
      const result = findChildFromParentById(directoryTree, '999');
      const expectValue: ReturnType<typeof findChildFromParentById> = undefined;
      expect(result).toStrictEqual(expectValue);
    });

    test("return child tree when searching tree exists in parent tree", () => {
      directoryTree = {
        ...directoryTree,
        children: [fileTree2, fileTree1]
      }
      const result = findChildFromParentById(directoryTree, '20');
      const expectValue: ReturnType<typeof findChildFromParentById> = fileTree1;
      expect(result).toStrictEqual(expectValue);
    });
  })

  describe("replaceChildFromParent", () => {
    test("add child tree when given child tree does not exist in parent tree", () => {
      directoryTree = {
        ...directoryTree,
        children: [fileTree1]
      }
      const result = replaceChildFromParent(directoryTree, fileTree2);
      const expectValue: ReturnType<typeof replaceChildFromParent> = {
        ...directoryTree,
        children: [fileTree2, fileTree1]
      };
      expect(result).toStrictEqual(expectValue);
    });

    test("replace child tree when given child tree exists in parent tree", () => {
      directoryTree = {
        ...directoryTree,
        children: [fileTree2, fileTree1]
      }
      const newFileTree2 = _.cloneDeep(fileTree2);
      newFileTree2.name = 'ccc';
      const result = replaceChildFromParent(directoryTree, newFileTree2);
      const expectValue: ReturnType<typeof replaceChildFromParent> = {
        ...directoryTree,
        children: [fileTree1, newFileTree2]
      }
      expect(result).toStrictEqual(expectValue);
    });
  })

  describe("removeChildFromParent", () => {
    test("remove child tree when given child tree does not exist in parent tree", () => {
      directoryTree = {
        ...directoryTree,
        children: [fileTree1]
      }
      const result = removeChildFromParent(directoryTree, fileTree2);
      const expectValue: ReturnType<typeof removeChildFromParent> = {
        ...directoryTree,
        children: [fileTree1]
      };
      expect(result).toStrictEqual(expectValue);
    });

    test("remove child tree when given child tree exists in parent tree", () => {
      directoryTree = {
        ...directoryTree,
        children: [fileTree2, fileTree1]
      }
      const result = removeChildFromParent(directoryTree, fileTree2);
      const expectValue: ReturnType<typeof removeChildFromParent> = {
        ...directoryTree,
        children: [fileTree1]
      }
      expect(result).toStrictEqual(expectValue);
    });
  })
})