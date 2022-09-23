class HierarchyData {
  constructor(idKeyName = id, parentIdKeyName = parentId) {
    this.idKeyName = idKeyName;
    this.parentIdKeyName = parentIdKeyName;
  }
  
  getIdKeyName() {
    return this.idKeyName;
  }
  
  getParentIdKeyName() {
    return this.parentIdKeyName;
  }

  findDataById = (datas, key) => {
    let find = false;
    for (let i = 0; i < datas.length; i ++) {
      if (datas[i][this.idKeyName] === key) {
        find = true;
        return datas[i];
      }
    }
  
    if (!find) {
      for (let data of datas) {
        if (data.children) {
          const result = this.findDataById(data.children, key);
          if (result) {
            return result;
          }
        }
      }
    }
  
    return null;
  }
}

module.exports = HierarchyData;