import { readInputFileSplitBy } from "../../common/file-utils"
import { sum } from "../../common/sum"

export function printDay3Part1 (): void {
    console.log("Solution of first puzzle:", day3part1(__dirname + "/../input.txt"), "\n")
}

function day3part1 (fileName: string): number {
    return sumOfPrioritiesForFile(fileName)
}

export function sumOfPrioritiesForFile (fileName: string): number {
    return sum(prioritiesForFile(fileName))
}

export function prioritiesForFile (fileName: string): number[] {
    const lines = readInputFileSplitBy(fileName, "\n")
    return lines.map(line => priorityOfCommonChars(line))
}

export function priority (char: string) {
    const codepoint = char.codePointAt(0)!
    if (codepoint >= 96) {
        return codepoint - 96
    } else {
        return codepoint - 38
    }
}

export function priorityOfCommonChars (line: string): number {
    const splitLine = splitLineInHalf(line)
    const commonChars = findCommonChars(splitLine[0], splitLine[1])
    if (commonChars.length !== 1) {
        throw Error("Expected only one common char but got \"" + commonChars + "\"")
    }
    return priority(commonChars)
}

export function findCommonChars (str1: string, str2: string): string {
    return [...str1]
        .filter(char => str2.includes(char))
        .reduce((acc: string[], cur: string) => {
            if (!acc.includes(cur)) {
                acc.push(cur)
            }
            return acc
        }, [])
        .join()
}

export function splitLineInHalf (line: string): string[] {
    return [line.substring(0, line.length / 2), line.substring(line.length / 2)]
}
