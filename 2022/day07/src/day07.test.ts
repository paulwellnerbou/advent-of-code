import { readInputFileSplitBy } from "../../common/file-utils"
import { sum } from "../../common/utils"
import { Day07 } from "./day07"

const TEST_INPUT_FILE = __dirname + "/../input-test.txt"
const INPUT_FILE = __dirname + "/../input.txt"

describe("Day 7", () => {
    const day = new Day07()
    test("Part 1: find all of the directories with a total size of at most 100000", () => {
        console.log("Part 1: Total size of all directories with a total size of at most 100000: ", day.part1(readInputFileSplitBy(INPUT_FILE)))
    })
    test("Part 2: find smallest directory to delete to free up necessary space", () => {
        console.log("Part 2: Size of smallest directory which would free up necessary space: ", day.part2(readInputFileSplitBy(INPUT_FILE)))
    })
})

describe("Tests", () => {
    const day = new Day07()

    test("Run part1 with test input", () => {
        expect(day.part1(readInputFileSplitBy(TEST_INPUT_FILE))).toBe(95437)
    })

    test("Run part2 with test input", () => {
        expect(day.part2(readInputFileSplitBy(TEST_INPUT_FILE))).toBe(24933642)
    })

    test("Calculate total size of filesystem", () => {
        const filesystem = day.parseInput(readInputFileSplitBy(TEST_INPUT_FILE))
        expect(filesystem.calculateSize()).toBe(48381165)
    })

    test("test find directories with size <= 100000", () => {
        const filesystem = day.parseInput(readInputFileSplitBy(TEST_INPUT_FILE))
        const dirs = filesystem.findDirectory(dir => dir.calculateSize() <= 100000)
        expect(dirs).toHaveLength(2)
        expect(dirs.map(d => d.name)).toStrictEqual(["a", "e"])
        expect(sum(dirs.map(d => d.calculateSize()))).toBe(95437)
    })

    test("test find directory by name", () => {
        const filesystem = day.parseInput(readInputFileSplitBy(TEST_INPUT_FILE))
        const allDirsNamedD = filesystem.findDirectory(dir => dir.name == "d")
        expect(allDirsNamedD).toHaveLength(1)
    })
})
