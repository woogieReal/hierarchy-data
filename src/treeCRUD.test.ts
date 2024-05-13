import { describe, expect, test } from "@jest/globals";
import { addTreeToUpper, findTreeFromUpper, replaceTreeFromUpper } from "./treeCRUD";
import { MOCK_FLAT_TREES, MOCK_HIERARCHY_TREES, TREE_3, TREE_5, TREE_7, TREE_8, TREE_9 } from "./utils/mock/data";
import { cloneDeep } from "lodash";
import { getTreePathArray } from "./utils/tree/treeUtil";
import { Tree } from "./types";
import _ from "lodash";

describe("treeCRUD", () => {
  describe("findTreeFromUpper", () => {
    test("retrun undefined if target tree does not exist", () => {
      const result = findTreeFromUpper(MOCK_HIERARCHY_TREES, 'NOT_EXISTS');
      const expectValue: ReturnType<typeof findTreeFromUpper> = undefined;
      expect(result).toStrictEqual(expectValue);
    });

    test("retrun tree if target tree's depth is 1", () => {
      const result = findTreeFromUpper(MOCK_HIERARCHY_TREES, '3');
      const expectValue: ReturnType<typeof findTreeFromUpper> = TREE_3;
      expect(result).toStrictEqual(expectValue);
    });

    test("retrun tree if target tree's depth is 2", () => {
      const result = findTreeFromUpper(MOCK_HIERARCHY_TREES, '4|5');
      const expectValue: ReturnType<typeof findTreeFromUpper> = TREE_5;
      expect(result).toStrictEqual(expectValue);
    });
  });

  describe("addTreeToUpper", () => {
    test("when parent tree is not found", () => {
      const lowerTree: Tree = {
        id: "NEW",
        name: "NEW",
        path: "NOT_EXISTS"
      };
      const result = addTreeToUpper(MOCK_HIERARCHY_TREES, lowerTree);
      const expectValue: ReturnType<typeof addTreeToUpper> = _.concat(lowerTree, MOCK_HIERARCHY_TREES);
      expect(result).toStrictEqual(expectValue);
    });

    test("when parent tree is found (1)", () => {
      const lowerTree: Tree = {
        id: "NEW",
        name: "NEW",
        path: "6|NEW"
      };
      const result = addTreeToUpper(MOCK_HIERARCHY_TREES, lowerTree);
      const expectValue: ReturnType<typeof addTreeToUpper> = _.cloneDeep(MOCK_HIERARCHY_TREES);
      expectValue[2].children?.unshift(lowerTree);
      expect(result).toStrictEqual(expectValue);
    });

    test("when parent tree is found (1)", () => {
      const lowerTree: Tree = {
        id: "NEW",
        name: "NEW",
        path: "6|7|NEW"
      };
      const result = addTreeToUpper(MOCK_HIERARCHY_TREES, lowerTree);
      const expectValue: ReturnType<typeof addTreeToUpper> = _.cloneDeep(MOCK_HIERARCHY_TREES);
      expectValue[2].children = [
        {
          ...TREE_7,
          children: [lowerTree, TREE_8, TREE_9]
        }
      ];
      expect(result).toStrictEqual(expectValue);
    });
  });

  describe("replaceTreeFromUpper", () => {
    test("when upperTrees' depth is same with lowerTree's", () => {
      const lowerTree: Tree = cloneDeep({
        ...TREE_3,
        name: 'updated'
      });

      const result = replaceTreeFromUpper(MOCK_HIERARCHY_TREES, lowerTree);
      const expectValue: ReturnType<typeof replaceTreeFromUpper> = _.cloneDeep(MOCK_HIERARCHY_TREES);
      expectValue[4] = lowerTree;

      expect(result).toStrictEqual(expectValue);
    });

    test("when upperTrees' depth is not same with lowerTree's (1)", () => {
      const lowerTree: Tree = cloneDeep({
        ...TREE_5,
        name: 'updated'
      });

      const result = replaceTreeFromUpper(MOCK_HIERARCHY_TREES, lowerTree);
      const expectValue: ReturnType<typeof replaceTreeFromUpper> = _.cloneDeep(MOCK_HIERARCHY_TREES);
      expectValue[1].children = [lowerTree];

      expect(result).toStrictEqual(expectValue);
    });

    test("when upperTrees' depth is not same with lowerTree's (2)", () => {
      const lowerTree: Tree = cloneDeep({
        ...TREE_9,
        name: 'updated'
      });

      const result = replaceTreeFromUpper(MOCK_HIERARCHY_TREES, lowerTree);
      const expectValue: ReturnType<typeof replaceTreeFromUpper> = _.cloneDeep(MOCK_HIERARCHY_TREES);
      expectValue[2].children = [
        {
          ...TREE_7,
          children: [TREE_8, lowerTree]
        }
      ];

      expect(result).toStrictEqual(expectValue);
    });

    test("when lowerTree is not found", () => {
      const lowerTree: Tree = {
        id: 'NOT_EXISTS',
        name: 'file_3_1_NOT_EXISTS',
        content: null,
        path: '6|7|NOT_EXISTS',
      };

      const result = replaceTreeFromUpper(MOCK_HIERARCHY_TREES, lowerTree);
      const expectValue: ReturnType<typeof replaceTreeFromUpper> = _.cloneDeep(MOCK_HIERARCHY_TREES);
      expectValue[2].children = [
        {
          ...TREE_7,
          children: [TREE_8, TREE_9, lowerTree]
        }
      ];

      expect(result).toStrictEqual(expectValue);
    });
  });

  // describe("removeTreeFromUpper", () => {
  //   test("1 depth 제거", () => {
  //     const targetTree = cloneDeep(DEPTH_1_TREE);

  //     const res = removeTreeFromUpper(MOCK_TREE_DATA, targetTree);
  //     const treeIds = res.treeChildren?.map(child => child.treeId);

  //     expect(treeIds).not.toContain(targetTree.treeId);
  //   });

  //   test("n depth 제거", () => {
  //     const targetTree = cloneDeep(DEPTH_3_TREE);

  //     const res = removeTreeFromUpper(MOCK_TREE_DATA, targetTree);

  //     const [ parentId1, parentId2 ] = targetTree.treePath.split('|').map(Number);

  //     const parentTree1 = res.treeChildren?.find(child => child.treeId === parentId1);
  //     const parentTree2 = parentTree1?.treeChildren?.find(child => child.treeId === parentId2);
  //     const treeIds = parentTree2?.treeChildren?.map(child => child.treeId);

  //     expect(treeIds).not.toContain(targetTree.treeId);
  //   });
  // });
});
