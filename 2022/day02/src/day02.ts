import { readInputFileSplitBy } from "../../common/file-utils"
import { sum } from "../../common/utils"

export function printDay2Part1 (): void {
    console.log("Solution of first puzzle:", day2part1(__dirname + "/../input.txt"), "\n")
}

export function printDay2Part2 (): void {
    console.log("Solution of second puzzle:", day2part2(__dirname + "/../input.txt"), "\n")
}

export function day2part1 (fileName: string): number {
    return sum(readInputFileSplitBy(fileName).map(line => calculatePointsOfLinePart1(line)))
}

export function day2part2 (fileName: string): number {
    return sum(readInputFileSplitBy(fileName).map(line => calculatePointsOfLinePart2(line)))
}

export function calculatePointsOfLinePart2 (line: string): number {
    const splitLine = line.split(" ")
    const myChoice = calculateMyChoice(splitLine[0], splitLine[1])
    return pointsForGame(splitLine[0], myChoice) + pointsFor(myChoice)
}

function gameFactor (num: number): number {
    return ((num < 0) ? num + 3 : num) % 3
}

export function calculateMyChoice (opponentsChoice: string, expectedOutcome: string): string {
    const op = codePoint(opponentsChoice) - 65
    const outcome = codePoint(expectedOutcome) - 65
    return String.fromCodePoint(65 + gameFactor(op + outcome - 1))
}

export function calculatePointsOfLinePart1 (line: string): number {
    const splitLine = line.split(" ")
    return pointsForGame(splitLine[0], splitLine[1]) + pointsFor(splitLine[1])
}

export function pointsForGame (opponentsChoice: string, myChoice: string): number {
    return gameFactor(codePoint(myChoice) - codePoint(opponentsChoice) + 1) * 3
}

export function codePoint (opponentsChoice: string): number {
    const codePoint = opponentsChoice.codePointAt(0)
    if (codePoint === undefined) throw Error()
    if (codePoint >= 88) {
        return codePoint - 23
    } else {
        return codePoint
    }
}

function pointsFor (char: string): number {
    return codePoint(char) - 64
}
