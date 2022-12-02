import {
  calculateMyChoice,
  calculatePointsOfLinePart1, calculatePointsOfLinePart2, codePoint,
  day2part1,
  day2part2,
  pointsForGame,
  printDay2Part1, printDay2Part2
} from './module'

describe('Run', () => {
  test('run first task', () => {
    printDay2Part1()
    printDay2Part2()
  })
})

describe('Tests', () => {
  test('test points for win', () => {
    expect(pointsForGame('A', 'B')).toEqual(6)
    expect(pointsForGame('B', 'C')).toEqual(6)
    expect(pointsForGame('C', 'A')).toEqual(6)
    expect(pointsForGame('A', 'Y')).toEqual(6)
  })

  test('test points for win or loose', () => {
    expect(pointsForGame('A', 'B')).toEqual(6)
    expect(pointsForGame('A', 'A')).toEqual(3)
    expect(pointsForGame('A', 'C')).toEqual(0)

    expect(pointsForGame('A', 'Z')).toEqual(0)
    expect(pointsForGame('A', 'X')).toEqual(3)
    expect(pointsForGame('A', 'Y')).toEqual(6)
  })

  test('test expected outcome: draw', () => {
    expect(calculateMyChoice('A', 'Y')).toBe('A')
    expect(calculateMyChoice('B', 'Y')).toBe('B')
    expect(calculateMyChoice('C', 'Y')).toBe('C')
  })

  test('test expected outcome: loose', () => {
    expect(calculateMyChoice('B', 'X')).toBe('A')
    expect(calculateMyChoice('C', 'X')).toBe('B')
    expect(calculateMyChoice('A', 'X')).toBe('C')
  })

  test('test expected outcome: win', () => {
    expect(calculateMyChoice('C', 'Z')).toBe('A')
  })

  test('test points of single game part 2', () => {
    expect(calculatePointsOfLinePart2('A Y')).toEqual(4)
  })

  test('test points of single game part 1', () => {
    expect(calculatePointsOfLinePart1('A Y')).toEqual(8)
  })

  test('Make sure test input gives the correct amount of points in part 1', () => {
    expect(day2part1('input-test.txt')).toEqual(15)
  })

  test('Make sure test input gives the correct amount of points in part 2', () => {
    expect(day2part2('input-test.txt')).toEqual(12)
  })

  test('calculate code points', () => {
    expect(codePoint('A')).toEqual(codePoint('X'))
    expect(codePoint('B')).toEqual(codePoint('Y'))
    expect(codePoint('C')).toEqual(codePoint('Z'))
  })
})
