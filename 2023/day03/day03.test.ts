import { expect, test } from "bun:test";
import { checkEngine, checkGears, isGear, isSymbol, isSymbolAtIndex, sumAllEnginePartNumbers } from "./day03";

test("check if symbol", () => {
  expect(isSymbolAtIndex('.', 0, isSymbol)).toBe(false)
  expect(isSymbolAtIndex('*', 0, isSymbol)).toBe(true)
  expect(isSymbolAtIndex('*', 0, isGear)).toBe(true)
  expect(isSymbolAtIndex('$', 0, isSymbol)).toBe(true)
  expect(isSymbolAtIndex('$', 0, isGear)).toBe(false)
  expect(isSymbolAtIndex('$', 1, isSymbol)).toBe(false)
  expect(isSymbolAtIndex('1*1', -1, isSymbol)).toBe(false)
  expect(isSymbolAtIndex('1*1', 0, isSymbol)).toBe(false)
  expect(isSymbolAtIndex('1*1', 1, isSymbol)).toBe(true)
  expect(isSymbolAtIndex('1*1', 2, isSymbol)).toBe(false)
  expect(isSymbolAtIndex('1*1', 3, isSymbol)).toBe(false)
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
  expect(sumAllEnginePartNumbers('..*', "1.1", '')).toBe(1)
  expect(sumAllEnginePartNumbers('*..', "1..", '')).toBe(1)
  expect(sumAllEnginePartNumbers('*..', "1.1", '')).toBe(1)
  expect(sumAllEnginePartNumbers('*..', "1.1", '...')).toBe(1)
  expect(sumAllEnginePartNumbers('*..', "1.1", '..*')).toBe(2)
  expect(sumAllEnginePartNumbers('*...', ".1.1", '...*')).toBe(2)
  expect(sumAllEnginePartNumbers('*...', ".1.1", '....')).toBe(1)
  expect(sumAllEnginePartNumbers('', "1.", '.*')).toBe(1)
  expect(sumAllEnginePartNumbers('111', "1*1", '111')).toBe(2)
  expect(sumAllEnginePartNumbers('', '467..114..', '...*......')).toBe(467)
})

test("calculate sum of valid numbers reading from file", () => {
  expect(checkEngine(import.meta.dir + "/test-input.txt")).resolves.toBe(4361)
})

test("calculate sum of gear ratios reading from file", () => {
  expect(checkGears(import.meta.dir + "/test-input.txt")).resolves.toBe(467835)
})

test("Part 1: ", () => {
  expect(checkEngine(import.meta.dir + "/input.txt")).resolves.toBe(546312)
})

test("Part 2: ", () => {
  // by the way... this may fail, if there are several gears connected to one number,
  // but it seems that in my input this case does not occur.
  expect(checkGears(import.meta.dir + "/input.txt")).resolves.toBe(87449461)
})
