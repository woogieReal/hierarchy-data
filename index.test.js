const HierarchyData = require("./index.js");
const mockData = require("./mockData.js");

const idKeyName = "id";
const parentIdKeyName = "parentId";

const hierarchyData = new HierarchyData({
  idKeyName: "id",
  parentIdKeyName: "parentId",
  childrenKeyName: "children",
});

describe("HierarchyData", () => {
  describe("findDataById()", () => {
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

    test("return null when not found", () => {
      expect(hierarchyData.findDataById(mockData, 'not_found_id')).toEqual(null);
    });
  });
});
