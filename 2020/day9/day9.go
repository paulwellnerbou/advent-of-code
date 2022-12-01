package day9

import (
	"advent-of-code-2020/common"
)

func FindTwoConsecutivesInvalidNumbersSummingUpToFirstOne(preamble int, input string) {
	_ = common.ToInts(common.ReadInput(input))
}

func FindFirstInvalidNumberFromInputfile(preamble int, input string) []int {
	return FindFirstInvalidNumber(preamble, common.ToInts(common.ReadInput(input)))
}

func FindFirstInvalidNumber(preamble int, ints []int) []int {
	var invalidNumbers []int
	for index, i := range ints[preamble:] {
		if !CheckValidNumber(ints[index:index+preamble], i) {
			return []int{i}
		}
	}
	return invalidNumbers
}

func CheckValidNumber(ints []int, i int) bool {
	for index1, i1 := range ints {
		for index2, i2 := range ints {
			if index1 != index2 && i1 + i2 == i {
				return true
			}
		}
	}
	return false
}

func SearchConsecutiveSummands(ints []int, result int) []int {
	for index, _ := range ints {
		sumUntilIndex := IndexUntilSumExactly(ints[index:], result)
		if sumUntilIndex > 0 {
			return ints[index:index+sumUntilIndex+1]
		}
	}
	return []int{}
}

func IndexUntilSumExactly(ints []int, max int) int {
	currentSum := 0
	for index, i := range ints {
		currentSum += i
		if currentSum == max {
			return index
		} else if currentSum > max {
			return -1
		}
	}
	return -1
}

func MinMax(array []int) (int, int) {
	var max int = array[0]
	var min int = array[0]
	for _, value := range array {
		if max < value {
			max = value
		}
		if min > value {
			min = value
		}
	}
	return min, max
}
