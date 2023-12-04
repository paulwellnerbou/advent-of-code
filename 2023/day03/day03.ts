import { sumAllLineResults } from "../common/file-utils"
import { range } from "../common/range"

export async function checkEngine(file: string) {
    let previousLine: string, currentLine: string, nextLine: string
    return sumAllLineResults(file, (line) => {
        previousLine = currentLine || ''
        currentLine = nextLine || ''
        nextLine = line
        return sumAllEnginePartNumbers(previousLine, currentLine, nextLine)
    }).then((sum) => {
        return sum + sumAllEnginePartNumbers(currentLine, nextLine, '')
    })
}

export const sumAllEnginePartNumbers = (previousLine: string, currentLine: string, nextLine: string): number => {
    let sum = 0
    let currentNumberString = ''
    for (let i = 0; i < currentLine.length; i++) {
        const char = currentLine.charAt(i)
        if (isDigit(char)) {
            currentNumberString += char
        } else {
            sum += isEnginePart(currentNumberString, i, previousLine, currentLine, nextLine)
            currentNumberString = ''
        }
    }
    sum += isEnginePart(currentNumberString, currentLine.length, previousLine, currentLine, nextLine)
    currentNumberString = ''
    return sum
}

export function isEnginePart(currentNumberString: string, endIndex: number, previousLine: string, currentLine: string, nextLine: string): number {
    if(!currentNumberString) return 0
    if (
        isSymbolAtIndices(previousLine, range(endIndex - currentNumberString.length - 1, endIndex + 1)) ||
        isSymbolAtIndices(currentLine, [endIndex - currentNumberString.length - 1, endIndex]) ||
        isSymbolAtIndices(nextLine, range(endIndex - currentNumberString.length - 1, endIndex + 1))
    ) {
        // console.debug('found valid part number ' + currentNumberString + ' at position ' + endIndex)
        return parseInt(currentNumberString) || 0
    }
    // console.debug('found not valid part number ' + currentNumberString + ' at position ' + endIndex)
    return 0
}

function isSymbolAtIndices(line: string, indices: number[]) {
    // console.debug('Search for symbols in line ' + line + ' and indices ' + indices)
    for (let i = 0; i < indices.length; i++) {
        if (isSymbolAtIndex(line, indices[i])) {
            return true
        }
    }
    return false
}

export function isSymbolAtIndex(line: string, index: number) {
    if (index < 0 || index >= line.length) {
        return false
    } else {
        return isSymbol(line.charAt(index))
    }
}

function isSymbol(char: string) {
    return char !== '.' && !isDigit(char)
}

export function isDigit(char: string): boolean {
    return !isNaN(+char)
}

export const printDay03 = async (): Promise<void> => {
    console.log("========== Day 03 ==========")
    console.log("Part 1: ", await day03part1())
}

export const day03part1 = async (): Promise<number> => {
    return checkEngine(import.meta.dir + "/input.txt")
}
