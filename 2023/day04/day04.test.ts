import { expect, test } from "bun:test";
import { parseLine, part2, processLinePart1 } from "./day04";
import { sumAllLineResults } from "../common/file-utils";

test('Parse card line', () => {
  const card = parseLine('Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83')
  expect(card.id).toBe(4)
  expect(card.winning).toEqual([41, 92, 73, 84, 69])
  expect(card.have).toEqual([59, 84, 76, 51, 58, 5, 54, 83])
})

test('Process card', () => {
  expect(processLinePart1('Card 1: 1 | 2')).toBe(0)
  expect(processLinePart1('Card 2: 1 | 1')).toBe(1)
  expect(processLinePart1('Card 2: 1 2 | 1 3')).toBe(1)
  expect(processLinePart1('Card 2: 1 3 | 1 3')).toBe(2)
  expect(processLinePart1('Card 2: 1 3 4 | 1 3 4')).toBe(4)
  expect(processLinePart1('Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83')).toBe(1)
  expect(processLinePart1('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')).toBe(8)
})

test("calculate sum of lines reading from file", () => {
  expect(sumAllLineResults(import.meta.dir + "/test-input.txt", (line) => processLinePart1(line))).resolves.toBe(13)
})

test("Part 1: ", () => {
  expect(sumAllLineResults(import.meta.dir + "/input.txt", (line) => processLinePart1(line))).resolves.toBe(20107)
})

test("Part 2: ", () => {
  expect(part2(import.meta.dir + "/test-input.txt")).resolves.toBe(30)
})

test("Part 2: ", () => {
  expect(part2(import.meta.dir + "/input.txt")).resolves.toBe(8172507)
})
