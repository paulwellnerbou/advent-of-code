/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as fs from 'fs'

export function printDay2Part1 (): void {
  console.log('Solution of first puzzle:', day2part1('input.txt'), '\n')
}

export function printDay2Part2 (): void {
  console.log('Solution of second puzzle:', day2part2('input.txt'), '\n')
}

export function day2part1 (fileName: string): number {
  return sum(readInputFileSplitBy(fileName).map(line => calculatePointsOfLinePart1(line)))
}

export function day2part2 (fileName: string): number {
  return sum(readInputFileSplitBy(fileName).map(line => calculatePointsOfLinePart2(line)))
}

export function calculatePointsOfLinePart2 (line: string): number {
  const splittedLine = line.split(' ')
  const myChoice = calculateMyChoice(splittedLine[0], splittedLine[1])
  return pointsForGame(splittedLine[0], myChoice) + pointsFor(myChoice)
}

function gameFactor (num: number): number {
  return ((num < 0) ? num + 3 : num) % 3
}

export function calculateMyChoice (opponentsChoice: string, expectedOutcome: string): string {
  const op = codePoint(opponentsChoice) - 65
  const outcome = codePoint(expectedOutcome) - 66

  return String.fromCodePoint(65 + gameFactor(op + outcome))
}

export function calculatePointsOfLinePart1 (line: string): number {
  const splittedLine = line.split(' ')
  return pointsForGame(splittedLine[0], splittedLine[1]) + pointsFor(splittedLine[1])
}

export function pointsForGame (opponentsChoice: string, myChoice: string): number {
  const op = codePoint(opponentsChoice) - 65
  const my = codePoint(myChoice) - 65
  const f = gameFactor(my - op + 1)
  return f * 3
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

export function sum (numbers: number[]): number {
  return numbers.reduce((accumulator, current) => {
    return accumulator + current
  }, 0)
}

export function readInputFileSplitBy (filename: string, splitBy: string = '\n'): string[] {
  return fs.readFileSync(filename, 'utf8').split(splitBy).filter(line => line)
}
