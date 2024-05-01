import { describe, expect, test } from "@jest/globals";
import { createDepthToTreesMap, makeTreeStructure, sortingTreeFromRootToLeef, createTreeStructureFromTrees } from './treeStructure';
import { Tree } from "../../types";
import _ from 'lodash';
import { MOCK_FLAT_TREES, MOCK_HIERARCHY_TREES } from "../mock/data";

describe("treeStructure", () => {
  describe("createDepthToTreesMap", () => {
    test("return empty Map type data, when parameter is empty array", () => {
      const trees: Tree[] = [];
      const result = createDepthToTreesMap(trees);
      const expectValue: ReturnType<typeof createDepthToTreesMap> = new Map<number, Tree[]>();
      expect(result).toStrictEqual(expectValue);
    });

    test("return Map type data with keys for each depth", () => {
      const trees: Tree[] = [
        {
          id: '10',
          name: 'directory',
          path: '10',
        },
        {
          id: '20',
          name: 'file',
          content: null,
          path: '20|10',
        },
      ];
      const result = createDepthToTreesMap(trees);
      const expectValue: ReturnType<typeof createDepthToTreesMap> = new Map<number, Tree[]>()
        .set(1, [trees[0]])
        .set(2, [trees[1]]);
      expect(result).toStrictEqual(expectValue);
    });
  });

  describe("makeTreeStructure", () => {
    test("return emtpy array if parameter map is empty", () => {
      const map: Map<number, Tree[]> = new Map<number, Tree[]>();
      const result = makeTreeStructure(map);
      const expectValue: ReturnType<typeof makeTreeStructure> = [];
      expect(result).toStrictEqual(expectValue);
    });

    test("return tree structure data array if parameter map is not empty", () => {
      const directoryTree: Tree = {
        id: '10',
        name: 'directory',
        path: '10',
      };
      const fileTree: Tree = {
        id: '20',
        name: 'file',
        content: null,
        path: '10|20',
      };
      const map: Map<number, Tree[]> = new Map<number, Tree[]>()
        .set(1, [directoryTree])
        .set(2, [fileTree]);
      const result = makeTreeStructure(map);
      const expectValue: ReturnType<typeof makeTreeStructure> = [
        {
          ...directoryTree,
          children: [fileTree]
        }
      ];
      expect(result).toStrictEqual(expectValue);
    });
  });

  describe("sortingTreeFromRootToLeef", () => {
    test("return input paramer without any modifications when parameter is empty array", () => {
      const trees: Tree[] = [];
      const result = sortingTreeFromRootToLeef(trees);
      const expectValue: ReturnType<typeof sortingTreeFromRootToLeef> = [];
      expect(result).toStrictEqual(expectValue);
    });

    test("return sorted tree structure data array when parameters are hierarchy datas", () => {
      const directoryTree: Tree = {
        id: '10',
        name: '111',
        path: '10',
      };
      const fileTree1: Tree = {
        id: '20',
        name: 'bbb',
        content: null,
        path: '10|20',
      };
      const fileTree2: Tree = {
        id: '30',
        name: 'aaa',
        content: null,
        path: '10|30',
      };
      const trees: Tree[] = [
        {
          ...directoryTree,
          children: [fileTree1, fileTree2]
        }
      ];
      const result = sortingTreeFromRootToLeef(trees);
      const expectValue: ReturnType<typeof sortingTreeFromRootToLeef> = [
        {
          ...directoryTree,
          children: [fileTree2, fileTree1]
        }
      ];
      expect(result).toStrictEqual(expectValue);
    });
  });

  describe("createTreeStructureFromTrees", () => {
    test("return empty array if parameter is empty array", () => {
      const result = createTreeStructureFromTrees([]);
      const expectValue: ReturnType<typeof createTreeStructureFromTrees> = [];
      expect(result).toStrictEqual(expectValue);
    });

    test("return tree structure data from tree structure data array", () => {
      const result = createTreeStructureFromTrees(_.cloneDeep(MOCK_FLAT_TREES));
      const expectValue: ReturnType<typeof createTreeStructureFromTrees> = _.cloneDeep(MOCK_HIERARCHY_TREES);
      expect(result).toStrictEqual(expectValue);
    });
  });
});

