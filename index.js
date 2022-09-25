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

  findAndUpdateData = (datas, targetData) => {
    let find = false;
    for (let i = 0; i < datas.length; i++) {
      if (datas[i].id === targetData.id) {
        find = true;
        datas[i] = targetData;
      }
    }

    if (find) {
      return datas;
    } else {
      for (let tree of datas) {
        if (tree.children) {
          tree.children = this.findAndUpdateData(tree.children, targetData);
        }
      }
      return datas;
    }
  };
}

module.exports = HierarchyData;
