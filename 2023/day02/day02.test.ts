import { expect, test } from "bun:test";
import { checkIfGameIsPossible, parseLineToGame, processLine } from "./day02";
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

test("calculate sum of lines reading from file", () => {
  const bag = { "red": 12, "green": 13, "blue": 14 }
  expect(sumAllLineResults(import.meta.dir + "/test-input1.txt", (line) => processLine(line, bag))).resolves.toBe(8)
})

test("Part 1: ", () => {
  const bag = { "red": 12, "green": 13, "blue": 14 }
  expect(sumAllLineResults(import.meta.dir + "/input.txt", (line) => processLine(line, bag))).resolves.toBe(2149)
})

test("Part 2: ", () => {
  const bag = { }
  expect(sumAllLineResults(import.meta.dir + "/input.txt", (line) => processLine(line, bag))).resolves.toBe(0)
})