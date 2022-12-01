import { findHighestSumInFile, findHighestThreeSumInInputFile, paragraphToListOfNumbers, readInputFileSplitBy, sumAll } from './module'

describe('Test reading input files', () => {
  test('find highest sum in file', () => {
    expect(findHighestThreeSumInInputFile('input-test.txt')).toEqual([24000, 11000, 10000])
  })
  test('find highest sum in file', () => {
    expect(findHighestSumInFile('input-test.txt')).toEqual([24000])
  })

  test('sum all groups of numbers', () => {
    const summedGroups = sumAll([[1, 2, 3], [3], [3, 4]])
    expect(summedGroups).toEqual([6, 3, 7])
  })

  test('convert paragraph to number array', () => {
    const numbers = paragraphToListOfNumbers('1\n2\n3\n')
    expect(numbers).toHaveLength(3)
    expect(numbers).toEqual([1, 2, 3])
  })

  test('reading file separated by two newlines', () => {
    const paragraphs = readInputFileSplitBy('input-test.txt', '\n\n')

    expect(paragraphs).toHaveLength(5)
    expect(paragraphs).toContain('10000')
  })
})
