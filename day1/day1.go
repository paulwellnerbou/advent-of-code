package day1

import "advent-of-code-2020/common"

func day1main() {
	inputs := common.ToInts(common.ReadInput("input"))
	println(SearchSumAndMultiply2(inputs, 2020))
	println(SearchSumAndMultiply3(inputs, 2020))
}

func SearchSumAndMultiply3(input []int, searchedSum int) int {
	for _, number := range input {
		n := SearchSumAndMultiply2(input, searchedSum-number)
		if n > 0 {
			return n*number
		}
	}
	return 0
}

func SearchSumAndMultiply2(input []int, searchedSum int) int {
	for _, first := range input {
		for _, second := range input {
			if first + second == searchedSum {
				return first * second
			}
		}
	}
	return 0
}
