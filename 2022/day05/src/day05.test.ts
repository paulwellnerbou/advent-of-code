import { Day05 } from "./day05"
import { CrateMover9000, CrateMover9001 } from "./CrateMover"

export const TEST_INPUT_FILE = __dirname + "/../input-test.txt"
const INPUT_FILE = __dirname + "/../input.txt"

describe("Day 5", () => {
    const day = new Day05(INPUT_FILE)
    test("Part 1", () => {
        console.log("Part 1: Top crates after rearrangement with CrateMover 9000: ", day.process(new CrateMover9000()))
        console.log(day.stacks.toString())
    })
    test("Part 2", () => {
        console.log("Part 1: Top crates after rearrangement with CrateMover 9001: ", day.process(new CrateMover9001()))
        console.log(day.stacks.toString())
    })
})

describe("Tests", () => {
    test("test part 2 with CrateMover 9001", () => {
        const day = new Day05(TEST_INPUT_FILE)
        day.readStacksFromFile()
        day.processMoveInstructions(new CrateMover9001())

        console.log(day.stacks.toString())

        expect(day.topCrates()).toBe("MCD")
    })

    test("test part 1 with CrateMover 9000", () => {
        const day = new Day05(TEST_INPUT_FILE)
        day.readStacksFromFile()
        day.processMoveInstructions(new CrateMover9000())

        console.log(day.stacks.toString())

        expect(day.stacks.stacks).toStrictEqual([
            ["C"],
            ["M"],
            ["Z", "N", "D", "P"],
        ])

        expect(day.topCrates()).toBe("CMZ")
    })
})
