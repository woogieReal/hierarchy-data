const HierarchyData = require("./index.js");
const mockData = require("./mockData.js");

const idKeyName = "id";
const parentIdKeyName = "parentId";

const hierarchyData = new HierarchyData({
  idKeyName: "id",
  parentIdKeyName: "parentId",
  childrenKeyName: "children",
});

let targetData;

describe("HierarchyData", () => {
  beforeEach(() => {
    targetData = {
      id: 1131,
      type: 20,
      name: "CASE",
      parent: 1130,
      children: null,
    };
  });

  describe("findDataById()", () => {
    test("return data by id", () => {
      expect(hierarchyData.findDataById(mockData, targetData.id)).toEqual(
        targetData
      );
    });

    test("return null when not found", () => {
      expect(hierarchyData.findDataById(mockData, "not_found_id")).toEqual(
        null
      );
    });
  });

  describe("findAndUpdateData()", () => {
    test("return datas after updating a data", () => {
      targetData.name = "CASE_AFTER_EDIT";
      const updatedDatas = hierarchyData.findAndUpdateData(
        mockData,
        targetData
      );
      const updatedData = hierarchyData.findDataById(
        updatedDatas,
        targetData.id
      );
      expect(updatedData.name).toEqual(targetData.name);
    });
  });
});
