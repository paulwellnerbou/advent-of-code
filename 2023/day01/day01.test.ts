import { expect, test } from "bun:test";
import { calculateNumberOfLine, preprocessLine } from "./day01";
import { sumAllLineResults } from "../common/file-utils";

test("calculate number for line", () => {
  expect(calculateNumberOfLine("1abc2")).toBe(12);
  expect(calculateNumberOfLine("pqr3stu8vwx")).toBe(38);
  expect(calculateNumberOfLine("a1b2c3d4e5f")).toBe(15);
  expect(calculateNumberOfLine("treb7uchet")).toBe(77);
});

test("Part 1: Calculate sum of lines reading from file", () => {
  expect(sumAllLineResults("./day01/test-input1.txt", (line) => calculateNumberOfLine(line))).resolves.toBe(142)
})

test("Part 2: calculate sum of lines reading from file, preprocessing text numbers before", () => {
  expect(sumAllLineResults("./day01/test-input2.txt", (line) => calculateNumberOfLine(preprocessLine(line)))).resolves.toBe(281)
})
