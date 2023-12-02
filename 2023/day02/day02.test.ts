import { expect, test } from "bun:test";
import { checkIfGameIsPossible, minimalSetOfCubes, parseLineToGame, powerOfSetOfCubes, idIfGameIsPossible, powerOfMinimalPossibleSetOfCubes } from "./day02";
import { sumAllLineResults } from "../common/file-utils";

test("checkIfGameIsPossible without data", () => {
  expect(checkIfGameIsPossible(
    {}, [{}]
  )).toBe(true)
})

test("checkIfGameIsPossible withturns but no cubes", () => {
  expect(checkIfGameIsPossible(
    {}, [
      { "red": 1, "green": 2, "blue": 3 },
      { "red": 1, "green": 3, "blue": 4 }
    ]
  )).toBe(false)
})

test("checkIfGameIsPossible: valid game", () => {
  expect(checkIfGameIsPossible(
    { "red": 1, "green": 1, "blue": 1 }, [{ "red": 1 }]
  )).toBe(true)
})

test("checkIfGameIsPossible: invalid game", () => {
  expect(checkIfGameIsPossible(
    { "red": 1, "green": 1, "blue": 1 }, [{ "red": 2 }]
  )).toBe(false)
})

test("parseLineToGameBag", () => {
  expect(parseLineToGame("Game 1: 1 red, 2 green, 3 blue; 1 red, 3 green, 4 blue")).toEqual({
    id: 1,
    turns: [
      { "red": 1, "green": 2, "blue": 3 },
      { "red": 1, "green": 3, "blue": 4 }
    ]
  })
})

test("calculate power of set of cubes", () => {
  expect(powerOfSetOfCubes({ "red": 1, "green": 2, "blue": 3 })).toBe(1 * 2 * 3)
  expect(powerOfSetOfCubes({ "red": 4, "green": 2, "blue": 6 })).toBe(4 * 2 * 6)
})

test("calculate minimal set of cubes", () => {
  expect(minimalSetOfCubes([{ "red": 1, "green": 2, "blue": 3 }], set => set)).toEqual({ "red": 1, "green": 2, "blue": 3 })
  expect(minimalSetOfCubes([
    { "red": 1, "green": 2, "blue": 3 },
    { "red": 3, "green": 1, "blue": 1 },
  ], set => set)).toEqual({ "red": 3, "green": 2, "blue": 3 })
})

test("Calculate sum for part 1 from test input", () => {
  const bag = { "red": 12, "green": 13, "blue": 14 }
  expect(sumAllLineResults(import.meta.dir + "/test-input1.txt", (line) => idIfGameIsPossible(line, bag))).resolves.toBe(8)
})

test("Calculate sum for part 2 from test input", () => {
  expect(sumAllLineResults(import.meta.dir + "/test-input1.txt", (line) => powerOfMinimalPossibleSetOfCubes(line))).resolves.toBe(2286)
})

test("Part 1: ", () => {
  const bag = { "red": 12, "green": 13, "blue": 14 }
  expect(sumAllLineResults(import.meta.dir + "/input.txt", (line) => idIfGameIsPossible(line, bag))).resolves.toBe(2149)
})

test("Part 2: ", () => {
  expect(sumAllLineResults(import.meta.dir + "/input.txt", (line) => powerOfMinimalPossibleSetOfCubes(line))).resolves.toBe(71274)
})