import {
    findCommonChars,
    printDay3Part1,
    prioritiesForFile,
    priority,
    priorityOfCommonChars,
    splitLineInHalf,
    sumOfPrioritiesForFile
} from "./part1"

const TEST_INPUT_FILE = __dirname + "/../input-test.txt"

describe("Run", () => {
    it("run first task", () => {
        printDay3Part1()
    })
})

describe("Tests", () => {

    it("test sum priorities for file", () => {
        expect(sumOfPrioritiesForFile(TEST_INPUT_FILE)).toEqual(157)
    })

    it("test get priorities for file", () => {
        expect(
            prioritiesForFile(TEST_INPUT_FILE)).toEqual(
            [16, 38, 42, 22, 20, 19]
        )
    })

    it("test priority", () => {
        expect(priority("p")).toEqual(16)
        expect(priority("A")).toEqual(27)
        expect(priority("L")).toEqual(38)
    })

    it("get priority for a rucksack", () => {
        expect(priorityOfCommonChars("vJrwpWtwJgWrhcsFMMfFFhFp")).toEqual(16)
        expect(priorityOfCommonChars("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL")).toEqual(38)
        expect(priorityOfCommonChars("PmmdzqPrVvPwwTWBwg")).toEqual(42)
        expect(priorityOfCommonChars("wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn")).toEqual(22)
        expect(priorityOfCommonChars("ttgJtRGJQctTZtZT")).toEqual(20)
        expect(priorityOfCommonChars("CrZsJsPPZsGzwwsLwLmpwMDw")).toEqual(19)
    })

    it("test find common chars", () => {
        expect(
            findCommonChars("vJrwpWtwJgWr", "hcsFMMfFFhFp")).toEqual(
            "p"
        )
        expect(
            findCommonChars("jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL")).toEqual("L")
    })

    it("test split line in half", () => {
        expect(splitLineInHalf("aa")).toEqual(["a", "a"])
        expect(splitLineInHalf("vJrwpWtwJgWrhcsFMMfFFhFp")).toEqual([
            "vJrwpWtwJgWr",
            "hcsFMMfFFhFp",
        ])
        expect(splitLineInHalf("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL")).toEqual(["jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL"])
    })
})
