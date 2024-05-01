import { Tree } from "../../types";

export const MOCK_FLAT_TREES: Tree[] = [
  {
    id: '1',
    name: 'directory_1',
    path: '1',
  },
  {
    id: '2',
    name: 'file_1',
    content: null,
    path: '2',
  },
  {
    id: '3',
    name: 'file_2',
    content: null,
    path: '3',
  },
  {
    id: '4',
    name: 'directory_2',
    path: '4',
  },
  {
    id: '5',
    name: 'file_2_1',
    content: null,
    path: '4|5',
  },
];

export const MOCK_HIERARCHY_TREES: Tree[] = [
  {
    id: '1',
    name: 'directory_1',
    path: '1',
  },
  {
    id: '2',
    name: 'file_1',
    content: null,
    path: '2',
  },
  {
    id: '3',
    name: 'file_2',
    content: null,
    path: '3',
  },
  {
    id: '4',
    name: 'directory_2',
    path: '4',
    children: [
      {
        id: '5',
        name: 'file_2_1',
        content: null,
        path: '4|5',
      },
    ]
  },
]