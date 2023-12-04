import { sumAllLineResults } from "../common/file-utils"
import { range } from "../common/range"

export async function checkEngine(file: string) {
    let previousLine: string, currentLine: string, nextLine: string
    return sumAllLineResults(file, (line, index) => {
        previousLine = currentLine || ''
        currentLine = nextLine || ''
        nextLine = line
        return sumAllEnginePartNumbers(previousLine, currentLine, nextLine)
    }).then((sum) => {
        return sum + sumAllEnginePartNumbers(currentLine, nextLine, '')
    })
}

export async function checkGears(file: string) {
    const alreadyFoundGears = new Map<string, number>();

    const foundCallback = (currentAbsoluteRow: number) => {
        return (number: number, position: number[]) => {
            const absoluteRowIndex = currentAbsoluteRow - 1 + position[1]
            const key = [position[0], absoluteRowIndex].toString()
            const value = alreadyFoundGears.get(key)
            if(value) {
                alreadyFoundGears.delete(key)
                return value * number
            } else {
                alreadyFoundGears.set(key, number)
                return 0
            }
        }
    }

    let currentIndex = 0
    let previousLine: string, currentLine: string, nextLine: string
    return sumAllLineResults(file, (line, index) => {
        previousLine = currentLine || ''
        currentLine = nextLine || ''
        nextLine = line
        currentIndex = index
        return sumAllGearRatios(previousLine, currentLine, nextLine, foundCallback(index))
    }).then((sum) => {
        return sum + sumAllGearRatios(currentLine, nextLine, '', foundCallback(currentIndex + 1))
    })
}

export const sumAllGearRatios = (previousLine: string, currentLine: string, nextLine: string, foundConnectedNumberCallback: (number: number, position: number[]) => number): number => {
    let sum = 0
    let currentNumberString = ''
    for (let i = 0; i < currentLine.length; i++) {
        const char = currentLine.charAt(i)
        if (isDigit(char)) {
            currentNumberString += char
        } else {
            processFoundNumber(i)
        }
    }
    processFoundNumber(currentLine.length)
    currentNumberString = ''
    return sum

    function processFoundNumber(i: number) {
        const gearPosition = isEnginePart(currentNumberString, i, previousLine, currentLine, nextLine)
        if (gearPosition !== undefined) {
            const value = (parseInt(currentNumberString) || 0)
            sum += foundConnectedNumberCallback(value, gearPosition)
        }
        currentNumberString = ''
    }
}

export const sumAllEnginePartNumbers = (previousLine: string, currentLine: string, nextLine: string): number => {
    let sum = 0
    let currentNumberString = ''
    for (let i = 0; i < currentLine.length; i++) {
        const char = currentLine.charAt(i)
        if (isDigit(char)) {
            currentNumberString += char
        } else {
            if (isEnginePart(currentNumberString, i, previousLine, currentLine, nextLine) !== undefined) {
                sum += (parseInt(currentNumberString) || 0)
            }
            currentNumberString = ''
        }
    }
    if (isEnginePart(currentNumberString, currentLine.length, previousLine, currentLine, nextLine) !== undefined) {
        sum += (parseInt(currentNumberString) || 0)
    }
    currentNumberString = ''
    return sum
}

export function isEnginePart(currentNumberString: string, endIndex: number, previousLine: string, currentLine: string, nextLine: string, isValidSymbol: (char: string) => boolean = isSymbol): number[] | undefined {
    if (!currentNumberString) return undefined

    const lines = [previousLine, currentLine, nextLine]
    for (let i = 0; i < 3; i++) {
        const rangeToCheck = i == 1 ? [endIndex - currentNumberString.length - 1, endIndex] : range(endIndex - currentNumberString.length - 1, endIndex + 1)
        const foundIndex = isSymbolAtIndices(lines[i], rangeToCheck, isValidSymbol)
        if (foundIndex !== undefined) {
            return [foundIndex, i]
        }
    }

    return undefined
}

function isSymbolAtIndices(line: string, indices: number[], isValidSymbol: (char: string) => boolean): number | undefined {
    for (let i = 0; i < indices.length; i++) {
        if (isSymbolAtIndex(line, indices[i], isValidSymbol)) {
            return indices[i]
        }
    }
    return undefined
}

export function isSymbolAtIndex(line: string, index: number, isValidSymbol: (char: string) => boolean) {
    if (index < 0 || index >= line.length) {
        return false
    } else {
        return isValidSymbol(line.charAt(index))
    }
}

export function isGear(char: string) {
    return char === '*'
}

export function isSymbol(char: string) {
    return char !== '.' && !isDigit(char)
}

export function isDigit(char: string): boolean {
    return !isNaN(+char)
}

export const printDay03 = async (): Promise<void> => {
    console.log("========== Day 03 ==========")
    console.log("Part 1: ", await day03part1())
    console.log("Part 2: ", await day03part2())
}

export const day03part1 = async (): Promise<number> => {
    return checkEngine(import.meta.dir + "/input.txt")
}

export const day03part2 = async (): Promise<number> => {
    return checkGears(import.meta.dir + "/input.txt")
}
