import { findHighestSumInInputFile, findHighestThreeSumInInputFile, sum } from './module'

day1Part1()
day1Part2()

export function day1Part1 (): void {
  console.log('Solution of first puzzle:', findHighestSumInInputFile('input.txt'), '\n')
}

export function day1Part2 (): void {
  const firstThree = findHighestThreeSumInInputFile('input.txt')
  console.log('Solution of second puzzle:', 'Sum of ', firstThree, ' = ', sum(firstThree))
}
