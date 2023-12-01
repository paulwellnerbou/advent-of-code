import { sumAllLineResults } from "../common/file-utils"

export const preprocessLine = (line: string): string => {
    return line.replaceAll("one", "one1one")
        .replaceAll("two", "two2two")
        .replaceAll("three", "three3three")
        .replaceAll("four", "four4four")
        .replaceAll("five", "five5five")
        .replaceAll("six", "six6six")
        .replaceAll("seven", "seven7seven")
        .replaceAll("eight", "eight8eight")
        .replaceAll("nine", "nine9nine")
}

export const calculateNumberOfLine = (line: string): number => {
    const digits = line.match(/\d{1}/g)?.map(n => n) as string[]
    return parseInt(digits[0] + digits[digits.length - 1])
}

export const printDay01 = async (): Promise<void> => {
    console.log("========== Day 01 ==========")
    console.log("Part 1: ", await day01part1())
    console.log("Part 2: ", await day01part2())
}

export const day01part1 = async (): Promise<number> => {
    return sumAllLineResults("./day01/2023-1-input.txt", (line) => calculateNumberOfLine(line))
}

export const day01part2 = async (): Promise<number> => {
    return sumAllLineResults("./day01/2023-1-input.txt", (line) => calculateNumberOfLine(preprocessLine(line)))
}
