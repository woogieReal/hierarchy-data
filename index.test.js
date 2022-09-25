const HierarchyData = require("./index.js");
const mockData = require("./mockData.js");

const hierarchyData = new HierarchyData({
  idKeyName: "id",
  parentIdKeyName: "parent",
  childrenKeyName: "children",
});

const NOT_FOUND_DATA_ID = 99999999999;
let targetData;
let targetDataDepth1;

describe("HierarchyData", () => {
  beforeEach(() => {
    targetData = {
      id: 1131,
      type: 20,
      name: "CASE",
      parent: 1130,
      children: null,
    };

    targetDataDepth1 = {
      id: 375,
      type: 10,
      name: "mysql",
      parent: 76,
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
      expect(hierarchyData.findDataById(mockData, NOT_FOUND_DATA_ID)).toEqual(
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

  describe("findDataPathById()", () => {
    test("return data path", () => {
      expect(hierarchyData.findDataPathById(mockData, targetData.id)).toEqual([
        "mysql",
        "구문분석",
        "Compound Statement",
        "Flow Control Statements",
      ]);
    });
  });

  describe("findIndexById()", () => {
    test("return data index in parent's children array", () => {
      expect(hierarchyData.findIndexById(mockData, targetData.id)).toBe(0);
    });
    
    test("return data index when target data's depth is 1", () => {
      expect(hierarchyData.findIndexById(mockData, targetDataDepth1.id)).toBe(2);
    });

    test("return -1 when target data is not found", () => {
      expect(hierarchyData.findIndexById(mockData, NOT_FOUND_DATA_ID)).toBe(-1);
    });
  });
});
