import {
    printDay1Part1,
    printDay1Part2,
    findHighestSumInFile,
    findHighestThreeSumInInputFile,
    paragraphToListOfNumbers,
    sumAll
} from "./day01"

describe("Run", () => {
    test("run first task", () => {
        printDay1Part1(__dirname + "/../input.txt")
    })
    test("run second task", () => {
        printDay1Part2(__dirname + "/../input.txt")
    })
})

describe("Test reading input files", () => {
    test("find highest sum in file", () => {
        expect(findHighestThreeSumInInputFile(__dirname + "/../input-test.txt")).toEqual([24000, 11000, 10000])
    })

    test("find highest sum in file", () => {
        expect(findHighestSumInFile(__dirname + "/../input-test.txt")).toEqual([24000])
    })

    test("sum all groups of numbers", () => {
        const summedGroups = sumAll([[1, 2, 3], [3], [3, 4]])
        expect(summedGroups).toEqual([6, 3, 7])
    })

    test("convert paragraph to number array", () => {
        const numbers = paragraphToListOfNumbers("1\n2\n3\n")
        expect(numbers).toHaveLength(3)
        expect(numbers).toEqual([1, 2, 3])
    })
})
