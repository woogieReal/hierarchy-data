import { Tree } from "../../types";

export const TREE_1: Tree = {
  id: '1',
  name: 'directory_1',
  path: '1',
};
export const TREE_2: Tree = {
  id: '2',
  name: 'file_1',
  content: null,
  path: '2',
};
export const TREE_3: Tree = {
  id: '3',
  name: 'file_2',
  content: null,
  path: '3',
};
export const TREE_4: Tree = {
  id: '4',
  name: 'directory_2',
  path: '4',
};
export const TREE_5: Tree = {
  id: '5',
  name: 'file_2_1',
  content: null,
  path: '4|5',
};
export const TREE_6: Tree = {
  id: '6',
  name: 'directory_3',
  path: '6',
};
export const TREE_7: Tree = {
  id: '7',
  name: 'directory_3_1',
  path: '6|7',
};
export const TREE_8: Tree = {
  id: '8',
  name: 'file_3_1_1',
  content: null,
  path: '6|7|8',
};
export const TREE_9: Tree = {
  id: '9',
  name: 'file_3_1_2',
  content: null,
  path: '6|7|9',
};

export const MOCK_FLAT_TREES: Tree[] = [
  TREE_1,
  TREE_2,
  TREE_3,
  TREE_4,
  TREE_5,
  TREE_6,
  TREE_7,
  TREE_8,
  TREE_9,
];

export const MOCK_HIERARCHY_TREES: Tree[] = [
  TREE_1,
  {
    ...TREE_4,
    children: [TREE_5]
  },
  {
    ...TREE_6,
    children: [
      {
        ...TREE_7,
        children: [TREE_8, TREE_9]
      }
    ]
  },
  TREE_2,
  TREE_3,
]