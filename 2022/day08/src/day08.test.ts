import { Day08 } from "./day08"

const INPUT_FILE = __dirname + "/../input.txt"
const TEST_INPUT_FILE = __dirname + "/../input-test.txt"

describe("Day 08", () => {
    const day = new Day08(INPUT_FILE)

    test("Part 1", () => {
        console.log("Part 1: ", day.countAllVisibleTrees())
    })
    test("Part 2", () => {
        console.log("Part 2: ", day.detectTreeWithBestScenicView())
    })
})
