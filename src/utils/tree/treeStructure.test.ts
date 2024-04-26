import { describe, expect, test } from "@jest/globals";
import { createDepthToTreesMap, makeTreeStructure, sortingTreeFromRootToLeef, createTreeStructureFromTrees } from './treeStructure';
import { ChildTree, RootTree } from "../../types";
import _ from 'lodash';
import { MOCK_FLAT_TREES, MOCK_HIERARCHY_TREE } from "../mock/data";

describe("treeStructure", () => {
  describe("createDepthToTreesMap", () => {
    test("return Map type data with key 0 and value is empty array, when parameter is empty array", () => {
      const trees: ChildTree[] = [];
      const result = createDepthToTreesMap(trees);
      const expectValue: ReturnType<typeof createDepthToTreesMap> = new Map<number, ChildTree[]>().set(0, []);
      expect(result).toStrictEqual(expectValue);
    });

    test("return Map type data with keys for each depth", () => {
      const trees: ChildTree[] = [
        {
          isRoot: false,
          type: 'directory',
          id: 10,
          name: 'directory',
          path: '',
        },
        {
          isRoot: false,
          type: 'file',
          id: 20,
          name: 'file',
          content: null,
          path: '10',
        },
      ];
      const result = createDepthToTreesMap(trees);
      const expectValue: ReturnType<typeof createDepthToTreesMap> = new Map<number, ChildTree[]>()
        .set(0, [trees[0]])
        .set(1, [trees[1]]);
      expect(result).toStrictEqual(expectValue);
    });
  });

  describe("makeTreeStructure", () => {
    test("return tree structure data with empty array as children", () => {
      const map: Map<number, ChildTree[]> = new Map<number, ChildTree[]>().set(0, []);
      const result = makeTreeStructure(map);
      const expectValue: ReturnType<typeof makeTreeStructure> = {
        isRoot: true,
        type: 'directory',
        children: []
      };
      expect(result).toStrictEqual(expectValue);
    });

    test("return tree structure data with hierarchy data as children", () => {
      const directoryTree: ChildTree = {
        isRoot: false,
        type: 'directory',
        id: 10,
        name: 'directory',
        path: '',
      };
      const fileTree: ChildTree = {
        isRoot: false,
        type: 'file',
        id: 20,
        name: 'file',
        content: null,
        path: '10',
      };
      const map: Map<number, ChildTree[]> = new Map<number, ChildTree[]>()
        .set(0, [directoryTree])
        .set(1, [fileTree]);
      const result = makeTreeStructure(map);
      const expectValue: ReturnType<typeof makeTreeStructure> = {
        isRoot: true,
        type: 'directory',
        children: [
          {
            ...directoryTree,
            children: [fileTree]
          }
        ]
      };
      expect(result).toStrictEqual(expectValue);
    });
  });

  describe("sortingTreeFromRootToLeef", () => {
    test("return input paramer without any modifications when parameter is tree structure data with empty array as children", () => {
      const rootTree: RootTree | ChildTree = {
        isRoot: true,
        type: 'directory',
        children: []
      };
      const result = sortingTreeFromRootToLeef(rootTree);
      const expectValue: ReturnType<typeof sortingTreeFromRootToLeef> = {
        isRoot: true,
        type: 'directory',
        children: []
      };
      expect(result).toStrictEqual(expectValue);
    });

    test("return sorted tree structure data when parameter has hierarchy data as children", () => {
      const directoryTree: ChildTree = {
        isRoot: false,
        type: 'directory',
        id: 10,
        name: 'directory',
        path: '',
      };
      const fileTree1: ChildTree = {
        isRoot: false,
        type: 'file',
        id: 20,
        name: 'bbb',
        content: null,
        path: '10',
      };
      const fileTree2: ChildTree = {
        isRoot: false,
        type: 'file',
        id: 30,
        name: 'aaa',
        content: null,
        path: '10',
      };
      const rootTree: RootTree | ChildTree = {
        isRoot: true,
        type: 'directory',
        children: [
          {
            ...directoryTree,
            children: [fileTree1, fileTree2]
          }
        ]
      };
      const result = sortingTreeFromRootToLeef(rootTree);
      const expectValue: ReturnType<typeof sortingTreeFromRootToLeef> = {
        isRoot: true,
        type: 'directory',
        children: [
          {
            ...directoryTree,
            children: [fileTree2, fileTree1]
          }
        ]
      };
      expect(result).toStrictEqual(expectValue);
    });
  });

  describe("createTreeStructureFromTrees", () => {
    test("return tree structure data with empty array as children from empty array", () => {
      const result = createTreeStructureFromTrees([]);
      const expectValue: ReturnType<typeof createTreeStructureFromTrees> = {
        isRoot: true,
        type: 'directory',
        children: []
      };
      expect(result).toStrictEqual(expectValue);
    });

    test("return tree structure data from flat data", () => {
      const result = createTreeStructureFromTrees(_.cloneDeep(MOCK_FLAT_TREES));
      const expectValue: ReturnType<typeof createTreeStructureFromTrees> = _.cloneDeep(MOCK_HIERARCHY_TREE);
      expect(result).toStrictEqual(expectValue);
    });
  });
});

