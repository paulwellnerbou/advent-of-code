import * as fs from 'fs'

export function findHighestThreeSumInInputFile (fileName: string): number[] {
  return findHighestSumInFile(fileName, 3)
}

export function findHighestSumInInputFile (fileName: string): number {
  return findHighestSumInFile(fileName, 1)[0]
}

export function findHighestSumInFile (fileName: string, numberOfSumsToReturn: number = 1): number[] {
  const paragraphs = readInputFileSplitBy(fileName, '\n\n')
  const numberGroups = paragraphs.map(p => paragraphToListOfNumbers(p))
  const summedGroups = sumAll(numberGroups).sort((n1, n2) => n2 - n1)

  return summedGroups.slice(0, numberOfSumsToReturn)
}

export function sumAll (numberGroups: number[][]): number[] {
  return numberGroups.map(group => sum(group))
}

export function sum (numbers: number[]): number {
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
