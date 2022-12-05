import { readInputFileSplitBy } from "../../common/file-utils"
import { sum } from "../../common/sum"

export function printDay1Part1 (fileName: string): void {
    console.log("Solution of first puzzle:", findHighestSumInInputFile(fileName), "\n")
}

export function printDay1Part2 (fileName: string): void {
    const firstThree = findHighestThreeSumInInputFile(fileName)
    console.log("Solution of second puzzle:", "Sum of ", firstThree, " = ", sum(firstThree))
}

export function findHighestThreeSumInInputFile (fileName: string): number[] {
    return findHighestSumInFile(fileName, 3)
}

export function findHighestSumInInputFile (fileName: string): number {
    return findHighestSumInFile(fileName, 1)[0]
}

export function findHighestSumInFile (fileName: string, numberOfSumsToReturn = 1): number[] {
    const paragraphs = readInputFileSplitBy(fileName, "\n\n")
    const numberGroups = paragraphs.map(p => paragraphToListOfNumbers(p))
    const summedGroups = sumAll(numberGroups).sort((n1, n2) => n2 - n1)

    return summedGroups.slice(0, numberOfSumsToReturn)
}

export function sumAll (numberGroups: number[][]): number[] {
    return numberGroups.map(group => sum(group))
}

export function paragraphToListOfNumbers (paragraph: string): number[] {
    return paragraph.split("\n").filter(line => line).map(line => parseInt(line.trim()))
}
