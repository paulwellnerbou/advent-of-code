import { expect, test } from "bun:test";
import { processLine } from "./day0X";
import { sumAllLineResults } from "../common/file-utils";

test("calculate sum of lines reading from file", () => {
  expect(sumAllLineResults(import.meta.dir + "/test-input.txt", (line) => processLine(line))).resolves.toBe(0)
})

test.skip("Part 1: ", () => {
  expect(sumAllLineResults(import.meta.dir + "/input.txt", (line) => processLine(line))).resolves.toBe(0)
})
