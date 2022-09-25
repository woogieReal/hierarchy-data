class HierarchyData {
  constructor({ idKeyName, parentIdKeyName, childrenKeyName }) {
    this.idKeyName = idKeyName;
    this.parentIdKeyName = parentIdKeyName;
    this.childrenKeyName = childrenKeyName;
  }

  findDataById = (datas, targetId) => {
    let find = false;
    for (let i = 0; i < datas.length; i++) {
      if (datas[i][this.idKeyName] === targetId) {
        find = true;
        return datas[i];
      }
    }

    if (!find) {
      for (let data of datas) {
        if (data.children) {
          const result = this.findDataById(
            data[this.childrenKeyName],
            targetId
          );
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

  findDataPathById = (datas, targetId) => {
    const paths = [];
    const targetData = this.findDataById(datas, targetId);

    if (!targetData) {
      return [];
    }

    let parentId = targetData[this.parentIdKeyName];

    while (parentId) {
      const parentData = this.findDataById(datas, parentId);
      if (!parentData) break;

      paths.unshift(parentData.name);
      parentId = parentData.parent;
    }

    return paths;
  };

  findIndexById = (datas, targetId) => {
    let parentData;
    let childrenData;
    let targetIndex = 0;

    const targetData = this.findDataById(datas, targetId);

    if (!targetData) {
      return -1;
    }

    const parentId = targetData[this.parentIdKeyName];
    if (parentId) {
      parentData = this.findDataById(datas, parentId);

      if (parentData) {
        childrenData = parentData[this.childrenKeyName];
      } else {
        childrenData = datas;
      }
    } else {
      childrenData = datas;
    }

    childrenData.forEach((data, index) => {
      data[this.idKeyName] === targetId && (targetIndex = index);
    });
    return targetIndex;
  };
}

module.exports = HierarchyData;
