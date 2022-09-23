const HierarchyData = require('./index.js');
const mockData = require('./mockData.js');

describe('getKey()', () => {
  describe('success', () => {
    test('return key', () => {
      const key = 'id';
      const parentKey = 'parentId';
    
      const hierarchyData = new HierarchyData(key, parentKey);

      expect(hierarchyData.getKey()).toBe(key);
    });
  })
})

describe('getParentKey()', () => {
  describe('success', () => {
    test('return parentKey', () => {
      const key = 'id';
      const parentKey = 'parentId';
    
      const hierarchyData = new HierarchyData(key, parentKey);

      expect(hierarchyData.getParentKey()).toBe(parentKey);
    });
  })
})
