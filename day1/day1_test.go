package main

import "testing"

func Test_readInput(t *testing.T) {
	var result = readInput()
	if result[0] != 1593 {
		t.Errorf("Expected 1593 but got %d", result[0])
	}
}

func Test_searchSumAndMultiply3(t *testing.T) {
	inputs := []int{1721, 979, 366, 299, 675, 1456}
	var result = searchSumAndMultiply3(inputs, 2020)
	if result != 241861950 {
		t.Errorf("Expected 241861950 but got %d", result)
	}
}

func Test_searchSumAndMultiply2(t *testing.T) {
	inputs := []int{1721, 979, 366, 299, 675, 1456}
	var result = searchSumAndMultiply2(inputs, 2020)
	if result != 514579 {
		t.Errorf("Expected 514579 but got %d", result)
	}
}
