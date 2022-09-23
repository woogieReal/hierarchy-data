class HierarchyData {
  constructor(uniqueKey, parentKey) {
    this.uniqueKey = uniqueKey;
    this.parentKey = parentKey;
  }
  
  getUniqueKey() {
    return this.uniqueKey;
  }
  
  getParentKey() {
    return this.parentKey;
  }
}

module.exports = HierarchyData;