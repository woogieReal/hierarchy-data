import { ChildTree, RootTree } from "../../types";

export const MOCK_FLAT_TREES: ChildTree[] = [
  {
    isRoot: false,
    type: 'directory',
    id: 1,
    name: 'directory_1',
    path: '',
  },
  {
    isRoot: false,
    type: 'file',
    id: 2,
    name: 'file_1',
    content: null,
    path: '',
  },
  {
    isRoot: false,
    type: 'file',
    id: 3,
    name: 'file_2',
    content: null,
    path: '',
  },
  {
    isRoot: false,
    type: 'directory',
    id: 4,
    name: 'directory_2',
    path: '',
  },
  {
    isRoot: false,
    type: 'file',
    id: 5,
    name: 'file_2_1',
    content: null,
    path: '4',
  },
];

export const MOCK_HIERARCHY_TREE: RootTree = {
  isRoot: true,
  type: 'directory',
  children: [
    {
      isRoot: false,
      type: 'directory',
      id: 1,
      name: 'directory_1',
      path: '',
      children: [],
    },
    {
      isRoot: false,
      type: 'directory',
      id: 4,
      name: 'directory_2',
      path: '',
      children: [
        {
          isRoot: false,
          type: 'file',
          id: 5,
          name: 'file_2_1',
          content: null,
          path: '4',
        },
      ]
    },
    {
      isRoot: false,
      type: 'file',
      id: 2,
      name: 'file_1',
      content: null,
      path: '',
    },
    {
      isRoot: false,
      type: 'file',
      id: 3,
      name: 'file_2',
      content: null,
      path: '',
    },
  ]
}