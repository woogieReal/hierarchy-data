class HierarchyData {
  constructor(key, parentKey) {
    this.key = key;
    this.parentKey = parentKey;
  }
  
  getKey() {
    return this.key;
  }
  
  getParentKey() {
    return this.parentKey;
  }
}

module.exports = HierarchyData;