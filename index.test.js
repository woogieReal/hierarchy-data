import HierarchyData from './index';

describe('getUniqueKey()', () => {
  describe('success', () => {
    test('return uniqueKey', () => {
      const uniqueKey = 'id';
      const parentKey = 'parentId';
    
      const hierarchyData = new HierarchyData(uniqueKey, parentKey);

      expect(hierarchyData.getUniqueKey()).toBe(uniqueKey);
    });
  })
})

describe('getParentKey()', () => {
  describe('success', () => {
    test('return parentKey', () => {
      const uniqueKey = 'id';
      const parentKey = 'parentId';
    
      const hierarchyData = new HierarchyData(uniqueKey, parentKey);

      expect(hierarchyData.getParentKey()).toBe(parentKey);
    });
  })
})
