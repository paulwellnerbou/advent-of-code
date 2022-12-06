import { readInputFileSplitBy } from "../../common/file-utils"
import { Day06 } from "./day06"

const INPUT_FILE = __dirname + "/../input.txt"

describe("Day 6", () => {
    const day = new Day06()
    const inputLine = readInputFileSplitBy(INPUT_FILE)[0]

    test("Part 1", () => {
        console.log("Part 1: Start-of-packet marker ends in position: ", day.findStartOfPacketMarker(inputLine))
    })
    test("Part 2", () => {
        console.log("Part 1: Start-of-message marker ends in position: ", day.findStartOfMessageMarker(inputLine))
    })
})

describe("Tests", () => {
    const day = new Day06()

    it.each([
        ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 7],
        ["bvwbjplbgvbhsrlpgdmjqwftvncz", 5],
        ["nppdvjthqldpwncqszvftbrmjlhg", 6],
        ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10],
        ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11],
    ])("Detect start-of-packet marker in '%p", (input: string, expected: number) => {
        expect(day.findStartOfPacketMarker(input)).toBe(expected)
    })

    it.each([
        ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 19],
        ["bvwbjplbgvbhsrlpgdmjqwftvncz", 23],
        ["nppdvjthqldpwncqszvftbrmjlhg", 23],
        ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 29],
        ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 26],
    ])("Detect start-of-message marker in '%p", (input: string, expected: number) => {
        expect(day.findStartOfMessageMarker(input)).toBe(expected)
    })
})
