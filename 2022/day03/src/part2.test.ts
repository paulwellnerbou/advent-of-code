import { day3part2, findBadgeInGroup, group, printDay3Part2 } from "./part2"
import { readInputFileSplitBy } from "../../common/file-utils"

const TEST_INPUT_FILE = __dirname + "/../input-test.txt"

describe("Run", () => {
    it("run second task", () => {
        printDay3Part2()
    })
})

describe("Tests", () => {

    test("test find badge in group", () => {
        expect(
            findBadgeInGroup(["vJrwpWtwJgWrhcsFMMfFFhFp", "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL", "PmmdzqPrVvPwwTWBwg"])
        ).toEqual("r")
        expect(
            findBadgeInGroup(["wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn", "ttgJtRGJQctTZtZT", "CrZsJsPPZsGzwwsLwLmpwMDw"])
        ).toEqual("Z")
    })

    test("test grouping in groups of three", () => {
        const groups = group(["A", "B", "C", "D", "E", "F"])
        expect(groups).toEqual([["A", "B", "C"], ["D", "E", "F"]])
    })

    test("test grouping in groups of three with test file", () => {
        const groups = group(readInputFileSplitBy(TEST_INPUT_FILE))
        expect(groups).toEqual([
            ["vJrwpWtwJgWrhcsFMMfFFhFp", "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL", "PmmdzqPrVvPwwTWBwg"],
            ["wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn", "ttgJtRGJQctTZtZT", "CrZsJsPPZsGzwwsLwLmpwMDw"]
        ])
    })

    test("test examples for part 2", () => {
        expect(day3part2(readInputFileSplitBy(TEST_INPUT_FILE))).toEqual(70)
    })
})
