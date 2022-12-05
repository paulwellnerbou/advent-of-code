import { Day04 } from "./day04-part1"

const TEST_INPUT_FILE = __dirname + "/../input-test.txt"
const INPUT_FILE = __dirname + "/../input.txt"

describe("Day 4", () => {
    const day04 = new Day04()
    test("Part 1", () => {
        console.log("Part 1: Completely overlapping sections: ", day04.countOverlappingAssignmentPairs(INPUT_FILE))
    })
    test("Part 2", () => {
        console.log("Part 2: Any overlapping sections: ", day04.countAnyOverlaps(INPUT_FILE))
    })
})

describe("Tests", () => {
    const day04 = new Day04()

    test("count any overlaps", () => {
        expect(day04.countAnyOverlaps(TEST_INPUT_FILE)).toBe(4)
    })

    test("count all complete overlaps", () => {
        expect(day04.countOverlappingAssignmentPairs(TEST_INPUT_FILE)).toBe(2)
    })

    test("test find complete overlaps in assigned sections", () => {
        expect(day04.isCompleteOverlap("2-4", "6-8")).toBeFalsy()
        expect(day04.isCompleteOverlap("2-8", "2-4")).toBeTruthy()
        expect(day04.isCompleteOverlap("2-4", "2-8")).toBeTruthy()
    })
})
