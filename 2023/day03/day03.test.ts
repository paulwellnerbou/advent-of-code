import { expect, test } from "bun:test";
import { checkEngine, isSymbolAtIndex, sumAllEnginePartNumbers } from "./day03";

test("check if symbol", () => {
  expect(isSymbolAtIndex('.', 0)).toBe(false)
  expect(isSymbolAtIndex('*', 0)).toBe(true)
  expect(isSymbolAtIndex('$', 0)).toBe(true)
  expect(isSymbolAtIndex('$', 1)).toBe(false)
  expect(isSymbolAtIndex('1*1', -1)).toBe(false)
  expect(isSymbolAtIndex('1*1', 0)).toBe(false)
  expect(isSymbolAtIndex('1*1', 1)).toBe(true)
  expect(isSymbolAtIndex('1*1', 2)).toBe(false)
  expect(isSymbolAtIndex('1*1', 3)).toBe(false)
})

test("sum all engine part numbers", () => {
  expect(sumAllEnginePartNumbers('', '1*1', '')).toBe(2)
  expect(sumAllEnginePartNumbers('', '1*.', '')).toBe(1)
  expect(sumAllEnginePartNumbers('', "111*", '')).toBe(111)
  expect(sumAllEnginePartNumbers('', "111*300", '')).toBe(411)
  expect(sumAllEnginePartNumbers('', "111..235..*300", '')).toBe(300)
  expect(sumAllEnginePartNumbers('', "111..*235..*300", '')).toBe(235+300)
  expect(sumAllEnginePartNumbers('', "111", '')).toBe(0)
  expect(sumAllEnginePartNumbers('', "1..", '')).toBe(0)
  expect(sumAllEnginePartNumbers('', "1.1", '')).toBe(0)
  expect(sumAllEnginePartNumbers('*..', "1.1", '')).toBe(1)
  expect(sumAllEnginePartNumbers('*..', "1.1", '...')).toBe(1)
  expect(sumAllEnginePartNumbers('*..', "1.1", '..*')).toBe(2)
  expect(sumAllEnginePartNumbers('*...', ".1.1", '...*')).toBe(2)
  expect(sumAllEnginePartNumbers('*...', ".1.1", '....')).toBe(1)
  expect(sumAllEnginePartNumbers('', "1.", '.*')).toBe(1)
  expect(sumAllEnginePartNumbers('111', "1*1", '111')).toBe(2)
  expect(sumAllEnginePartNumbers('', '467..114..', '...*......')).toBe(467)
})

test("calculate sum of lines reading from file", () => {
  expect(checkEngine(import.meta.dir + "/test-input1.txt")).resolves.toBe(4361)
})

test("Part 1: ", () => {
  expect(checkEngine(import.meta.dir + "/input.txt")).resolves.toBe(546312)
})
