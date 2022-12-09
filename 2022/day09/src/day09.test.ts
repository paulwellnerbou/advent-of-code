import { Day09, day09part1, day09part2 } from "./day09"

const TEST_INPUT_FILE = __dirname + "/../input-test.txt"
const TEST_INPUT_FILE_2 = __dirname + "/../input-test-2.txt"
const INPUT_FILE = __dirname + "/../input.txt"

describe("Day 09", () => {
    test("Part 1", () => {
        console.log("Part 1: ", day09part1(INPUT_FILE))
    })
    test("Part 2", () => {
        console.log("Part 2: ", day09part2(INPUT_FILE))
    })
})

describe("Tests", () => {

    test("count visited positions with 10 knots and a bit more complicated example", () => {
        const day = new Day09(10)
        day.process(TEST_INPUT_FILE_2)
        console.log(day.distinctVisits())
        expect(day.distinctVisits().length).toBe(36)
    })

    test("count visited positions with 10 knots", () => {
        const day = new Day09(10)
        day.process(TEST_INPUT_FILE)
        console.log(day.distinctVisits())
        expect(day.distinctVisits().length).toBe(1)
    })

    test("test construction of knot array", () => {
        const day = new Day09(2)
        expect(day.knots).toHaveLength(2)
        expect(day.knots.at(-1)).toBeDefined()
    })

    test("count visited positions", () => {
        const day = new Day09(2)
        day.process(TEST_INPUT_FILE)
        console.log(day.distinctVisits())
        expect(day.distinctVisits().length).toBe(13)
    })

    test("test move head through moves in test file", () => {
        const day = new Day09(2)
        day.moveHead("R 4")
        expect(day.head()).toStrictEqual({x: 4, y: 0})
        expect(day.tail()).toStrictEqual({x: 3, y: 0})
        day.moveHead("U 4")
        expect(day.head()).toStrictEqual({x: 4, y: 4})
        expect(day.tail()).toStrictEqual({x: 4, y: 3})
        day.moveHead("L 3")
        expect(day.head()).toStrictEqual({x: 1, y: 4})
        expect(day.tail()).toStrictEqual({x: 2, y: 4})
        day.moveHead("D 1")
        expect(day.head()).toStrictEqual({x: 1, y: 3})
        expect(day.tail()).toStrictEqual({x: 2, y: 4})
        day.moveHead("R 4")
        expect(day.head()).toStrictEqual({x: 5, y: 3})
        expect(day.tail()).toStrictEqual({x: 4, y: 3})
        day.moveHead("D 1")
        expect(day.head()).toStrictEqual({x: 5, y: 2})
        expect(day.tail()).toStrictEqual({x: 4, y: 3})
        day.moveHead("L 5")
        expect(day.head()).toStrictEqual({x: 0, y: 2})
        expect(day.tail()).toStrictEqual({x: 1, y: 2})
        day.moveHead("R 2")
        expect(day.head()).toStrictEqual({x: 2, y: 2})
        expect(day.tail()).toStrictEqual({x: 1, y: 2})
    })

    test("test move head one right", () => {
        const day = new Day09(2)
        day.moveHead("R 1")
        expect(day.head()).toStrictEqual({x: 1, y: 0})
        expect(day.tail()).toStrictEqual({x: 0, y: 0})
        day.moveHead("R 1")
        expect(day.head()).toStrictEqual({x: 2, y: 0})
        expect(day.tail()).toStrictEqual({x: 1, y: 0})
    })

    test("test move head four right", () => {
        const day = new Day09(2)
        day.moveHead("R 4")
        expect(day.head()).toStrictEqual({x: 4, y: 0})
    })
})
