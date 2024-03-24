const HierarchyData = require("./index.js");
const mockData = require("./mockData.js");

const hierarchyOption = {
  idKeyName: "treeId",
  parentIdKeyName: "parentTreeId",
  childrenKeyName: "childrenTree",
};
const hierarchyData = new HierarchyData(hierarchyOption);

const NOT_FOUND_DATA_ID = 99999999999;
let targetData;
let targetDataDepth1;

describe("HierarchyData", () => {
  beforeEach(() => {
    targetData = {
      treeId: 1131,
      type: 20,
      name: "CASE",
      parentTreeId: 1130,
      childrenTree: null,
    };

    targetDataDepth1 = {
      treeId: 375,
      type: 10,
      name: "mysql",
      parentTreeId: null,
      childrenTree: null,
    };
  });

  describe("findDataById()", () => {
    test("return data by id", () => {
      expect(
        hierarchyData.findDataById(
          mockData,
          targetData[hierarchyOption.idKeyName]
        )
      ).toEqual(targetData);
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
        targetData[hierarchyOption.idKeyName]
      );
      expect(updatedData.name).toEqual(targetData.name);
    });
  });

  describe("findDataPathById()", () => {
    test("return data path", () => {
      expect(
        hierarchyData.findDataPathById(
          mockData,
          targetData[hierarchyOption.idKeyName]
        )
      ).toEqual([
        "mysql",
        "구문분석",
        "Compound Statement",
        "Flow Control Statements",
      ]);
    });
  });

  describe("findIndexById()", () => {
    test("return data index in parent's children array", () => {
      expect(
        hierarchyData.findIndexById(
          mockData,
          targetData[hierarchyOption.idKeyName]
        )
      ).toBe(0);
    });

    test("return data index when target data's depth is 1", () => {
      expect(
        hierarchyData.findIndexById(
          mockData,
          targetDataDepth1[hierarchyOption.idKeyName]
        )
      ).toBe(2);
    });

    test("return -1 when target data is not found", () => {
      expect(hierarchyData.findIndexById(mockData, NOT_FOUND_DATA_ID)).toBe(-1);
    });
  });
});
