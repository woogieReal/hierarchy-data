class HierarchyData {
  constructor(idKeyName, parentIdKeyName) {
    this.idKeyName = idKeyName;
    this.parentIdKeyName = parentIdKeyName;
  }
  
  getIdKeyName() {
    return this.idKeyName;
  }
  
  getParentIdKeyName() {
    return this.parentIdKeyName;
  }
}

module.exports = HierarchyData;