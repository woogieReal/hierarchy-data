const HierarchyData = require("./index.js");
const mockData = require("./mockData.js");

const idKeyName = "id";
const parentIdKeyName = "parentId";

const hierarchyData = new HierarchyData(idKeyName, parentIdKeyName);

describe("HierarchyData", () => {
  describe("getKey()", () => {
    describe("success", () => {
      test("return idKeyName", () => {
        expect(hierarchyData.getIdKeyName()).toBe(idKeyName);
      });
    });
  });

  describe("getParentKey()", () => {
    describe("success", () => {
      test("return parentIdKeyName", () => {
        expect(hierarchyData.getParentIdKeyName()).toBe(parentIdKeyName);
      });
    });
  });

  describe("findDataById()", () => {
    describe("success", () => {
      test("return data by id", () => {
        const targetData = {
          id: 1131,
          type: 20,
          name: "CASE",
          parent: 1130,
          children: null,
        };
        expect(hierarchyData.findDataById(mockData, 1131)).toEqual(targetData);
      });
    });
  });
});
