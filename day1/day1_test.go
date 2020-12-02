package day1

import "testing"

func TestDay1Main(t *testing.T) {
	day1main()
}

func TestSearchSumAndMultiply3(t *testing.T) {
	inputs := []int{1721, 979, 366, 299, 675, 1456}
	var result = SearchSumAndMultiply3(inputs, 2020)
	if result != 241861950 {
		t.Errorf("Expected 241861950 but got %d", result)
	}
}

func TestSearchSumAndMultiply2(t *testing.T) {
	inputs := []int{1721, 979, 366, 299, 675, 1456}
	var result = SearchSumAndMultiply2(inputs, 2020)
	if result != 514579 {
		t.Errorf("Expected 514579 but got %d", result)
	}
}
