import { Day10 } from "./day10"

const TEST_INPUT_FILE = __dirname + "/../input-test.txt"
const INPUT_FILE = __dirname + "/../input.txt"

describe("Day 10", () => {
    const day = new Day10()
    test("Part 1", () => {
        console.log("Part 1: ", day.calculateAccumulatedSignalStrengthSum(INPUT_FILE))
    })
    test("Part 2", () => {
        console.log("Part 2: \r\n", day.drawCrtAndRenderScreen(TEST_INPUT_FILE))
        console.log("Part 2: \r\n", day.drawCrtAndRenderScreen(INPUT_FILE))
        /**
         * ECZUZALR
         *
         * ####..##..####.#..#.####..##..#....###..
         * #....#..#....#.#..#....#.#..#.#....#..#.
         * ###..#......#..#..#...#..#..#.#....#..#.
         * ##...#.....#...#..#..#...####.#....###..
         * #....#..#.#....#..#.#....#..#.#....#.#..
         * ####..##..####..##..####.#..#.####.#..#.
         */
    })
})

