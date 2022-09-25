class HierarchyData {
  constructor({ idKeyName, parentIdKeyName, childrenKeyName }) {
    this.idKeyName = idKeyName;
    this.parentIdKeyName = parentIdKeyName;
    this.childrenKeyName = childrenKeyName;
  }

  findDataById = (datas, key) => {
    let find = false;
    for (let i = 0; i < datas.length; i++) {
      if (datas[i][this.idKeyName] === key) {
        find = true;
        return datas[i];
      }
    }

    if (!find) {
      for (let data of datas) {
        if (data.children) {
          const result = this.findDataById(data[this.childrenKeyName], key);
          if (result) {
            return result;
          }
        }
      }
    }

    return null;
  };
}

module.exports = HierarchyData;
