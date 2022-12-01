import * as fs from 'fs'

export default function findHighestSumInInputFile (): number {
  return findHighestSumInFile('input.txt')
}

export function findHighestSumInFile (fileName: string): number {
  const paragraphs = readInputFileSplitBy(fileName, '\n\n')
  const numberGroups = paragraphs.map(p => paragraphToListOfNumbers(p))
  const summedGroups = sumAll(numberGroups)

  return Math.max(...summedGroups)
}

export function sumAll (numberGroups: number[][]): number[] {
  return numberGroups.map(group => sum(group))
}

function sum (numbers: number[]): number {
  return numbers.reduce((accumulator, current) => {
    return accumulator + current
  }, 0)
}

export function paragraphToListOfNumbers (paragraph: string): number[] {
  return paragraph.split('\n').filter(line => line).map(line => parseInt(line.trim()))
}

export function readInputFileSplitBy (filename: string, splitBy: string): string[] {
  return readInputFile(filename).split(splitBy)
}

function readInputFile (fileName: string): string {
  return fs.readFileSync(fileName, 'utf8')
}
