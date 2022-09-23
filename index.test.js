const HierarchyData = require('./index.js');
const mockData = require('./mockData.js');

const idKeyName = 'id';
const parentIdKeyName = 'parentId';

const hierarchyData = new HierarchyData(idKeyName, parentIdKeyName);

describe('getKey()', () => {
  describe('success', () => {
    test('return idKeyName', () => {
      expect(hierarchyData.getIdKeyName()).toBe(idKeyName);
    });
  })
})

describe('getParentKey()', () => {
  describe('success', () => {
    test('return parentIdKeyName', () => {
      expect(hierarchyData.getParentIdKeyName()).toBe(parentIdKeyName);
    });
  })
})
