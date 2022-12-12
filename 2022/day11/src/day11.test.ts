import { Day11 } from "./day11"

const TEST_INPUT_FILE = __dirname + "/../input-test.txt"
const INPUT_FILE = __dirname + "/../input.txt"

describe("Day 11", () => {

    test("Part 1", () => {
        const day = new Day11()
        day.parseMonkeyFromFile(INPUT_FILE)
        day.rounds(20, (n: number) => n / 3)
        console.log("Part 1: monkey item inspections", day.monkeyInspectsItems)
        console.log("Part 1: monkey business", day.monkeyBusiness())
    })

    test("Part 2", () => {
        const day = new Day11()
        day.parseMonkeyFromFile(INPUT_FILE)
        day.rounds(10000, (n: number) => n % day.productOfAllMonkeyDivisables)
        console.log("Part 1: monkey item inspections", day.monkeyInspectsItems.sort((a, b) => b - a))
        console.log("Part 1: monkey business", day.monkeyBusiness())
    })
})

describe("Tests", () => {

    test("Test 10000 rounds and check most inspected items without reducing worry level", () => {
        const day = new Day11()
        day.parseMonkeyFromFile(TEST_INPUT_FILE)
        day.rounds(10000, (n: number) => n % day.productOfAllMonkeyDivisables)

        expect(day.monkeyInspectsItems).toContain(52166)
        expect(day.monkeyInspectsItems).toContain(52013)
        expect(day.monkeyBusiness()).toBe(2713310158)
    })

    test("Test 1 round and check most inspected items without reducing worry level", () => {
        const day = new Day11()
        day.parseMonkeyFromFile(TEST_INPUT_FILE)
        day.rounds(1, (n: number) => n)

        expect(day.monkeyInspectsItems).toStrictEqual([2, 4, 3, 6])
        expect(day.monkeyBusiness()).toBe(6*4)
    })

    test("Test 20 rounds and check most inspected items without reducing worry level", () => {
        const day = new Day11()
        day.parseMonkeyFromFile(TEST_INPUT_FILE)
        day.rounds(20, (n: number) => n % day.productOfAllMonkeyDivisables)

        expect(day.monkeyInspectsItems).toStrictEqual([99, 97, 8, 103])
        expect(day.monkeyBusiness()).toBe(99*103)
    })

    test("Test 20 rounds and check most inspected items", () => {
        const day = new Day11()
        day.parseMonkeyFromFile(TEST_INPUT_FILE)
        day.rounds(20, (n: number) => n / 3)

        expect(day.monkeyInspectsItems).toStrictEqual([101, 95, 7, 105])
        expect(day.monkeyBusiness()).toBe(10605)
    })

    test("test process first round", () => {
        const day = new Day11()
        day.parseMonkeyFromFile(TEST_INPUT_FILE)

        day.nextRound((n: number) => n / 3)
        expect(day.monkeys[0].itemsWorryLevel).toStrictEqual([20, 23, 27, 26])
        expect(day.monkeys[1].itemsWorryLevel).toStrictEqual([2080, 25, 167, 207, 401, 1046])
        expect(day.monkeys[2].itemsWorryLevel).toStrictEqual([])
        expect(day.monkeys[3].itemsWorryLevel).toStrictEqual([])

        day.nextRound((n: number) => n / 3)
        expect(day.monkeys[0].itemsWorryLevel).toStrictEqual([695, 10, 71, 135, 350])
        expect(day.monkeys[1].itemsWorryLevel).toStrictEqual([43, 49, 58, 55, 362])
        expect(day.monkeys[2].itemsWorryLevel).toStrictEqual([])
        expect(day.monkeys[3].itemsWorryLevel).toStrictEqual([])

        day.nextRound((n: number) => n / 3)
        expect(day.monkeys[0].itemsWorryLevel).toStrictEqual([16, 18, 21, 20, 122])
        expect(day.monkeys[1].itemsWorryLevel).toStrictEqual([1468, 22, 150, 286, 739])
        expect(day.monkeys[2].itemsWorryLevel).toStrictEqual([])
        expect(day.monkeys[3].itemsWorryLevel).toStrictEqual([])
    })

    test("test read monkeys from file", () => {
        const day = new Day11()
        day.parseMonkeyFromFile(TEST_INPUT_FILE)
        expect(day.monkeys).toHaveLength(4)
        expect(day.monkeys[0].itemsWorryLevel).toStrictEqual([79, 98])
        expect(day.monkeys[0].operation(11)).toBe(11 * 19)
        expect(day.monkeys[0].throwTo(23)).toBe(2)
        expect(day.monkeys[0].throwTo(24)).toBe(3)

        expect(day.monkeys[1].itemsWorryLevel).toStrictEqual([54, 65, 75, 74])
        expect(day.monkeys[1].operation(5)).toBe(5 + 6)
        expect(day.monkeys[1].throwTo(23)).toBe(0)
        expect(day.monkeys[1].throwTo(19)).toBe(2)
        expect(day.monkeys[1].throwTo(19 * 2)).toBe(2)

        expect(day.monkeys[2].itemsWorryLevel).toStrictEqual([79, 60, 97])
        expect(day.monkeys[2].operation(5)).toBe(5 * 5)
        expect(day.monkeys[2].throwTo(13)).toBe(1)
        expect(day.monkeys[2].throwTo(19)).toBe(3)
    })
})
