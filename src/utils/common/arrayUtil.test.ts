import { describe, expect, test } from "@jest/globals";
import { getEmptyArrayIfNotArray } from "./arrayUtil";
import _ from 'lodash';

describe("arrayUtil", () => {
  describe("getEmptyArrayIfNotArray", () => {
    describe("return empty array if parameter's type is not array", () => {
      test("parameter's type is undefined", () => {
        const param = undefined;
        const result = getEmptyArrayIfNotArray(param);
        const expectValue: ReturnType<typeof getEmptyArrayIfNotArray> = [];
        expect(result).toStrictEqual(expectValue);
      });

      test("parameter's type is null", () => {
        const param = null;
        const result = getEmptyArrayIfNotArray(param);
        const expectValue: ReturnType<typeof getEmptyArrayIfNotArray> = [];
        expect(result).toStrictEqual(expectValue);
      });

      test("parameter's type is number", () => {
        const param = 10;
        const result = getEmptyArrayIfNotArray(param);
        const expectValue: ReturnType<typeof getEmptyArrayIfNotArray> = [];
        expect(result).toStrictEqual(expectValue);
      });

      test("parameter's type is string", () => {
        const param = 'aaa';
        const result = getEmptyArrayIfNotArray(param);
        const expectValue: ReturnType<typeof getEmptyArrayIfNotArray> = [];
        expect(result).toStrictEqual(expectValue);
      });

      test("parameter's type is key value object", () => {
        const param = { a: 1 };
        const result = getEmptyArrayIfNotArray(param);
        const expectValue: ReturnType<typeof getEmptyArrayIfNotArray> = [];
        expect(result).toStrictEqual(expectValue);
      });
    });

    describe("return given parameter if parameter's type is array", () => {
      test("parameter's type is number array", () => {
        const param = [1, 2];
        const result = getEmptyArrayIfNotArray(param);
        const expectValue: ReturnType<typeof getEmptyArrayIfNotArray> = _.cloneDeep(param);
        expect(result).toStrictEqual(expectValue);
      });

      test("parameter's type is string array", () => {
        const param = ['aaa', 'bbb'];
        const result = getEmptyArrayIfNotArray(param);
        const expectValue: ReturnType<typeof getEmptyArrayIfNotArray> = _.cloneDeep(param);
        expect(result).toStrictEqual(expectValue);
      });
    });
  });
});
