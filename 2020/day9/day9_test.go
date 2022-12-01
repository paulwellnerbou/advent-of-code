package day9

import (
	"advent-of-code-2020/common"
	"fmt"
	"reflect"
	"testing"
)

func TestDay9PartOne(t *testing.T) {
	fmt.Printf("%v", FindFirstInvalidNumberFromInputfile(25, "input"))
}

func TestPartTwo(t *testing.T) {
	preamble := 25
	ints := common.ToInts(common.ReadInput("input"))
	invalidNumber := FindFirstInvalidNumber(preamble, ints)[0]
	fmt.Printf("%v\n", invalidNumber)

	summands := SearchConsecutiveSummands(ints, invalidNumber)
	fmt.Printf("%v\n", summands)

	min, max := MinMax(summands)
	fmt.Printf("%v\n", min + max)
}

func Test_checkSequence(t *testing.T) {
	type args struct {
		preamble int
		input    string
		onlyFirst bool
	}
	tests := []struct {
		name string
		args args
		want []int
	}{
		{"", args{5, "testinput", true}, []int{127}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := FindFirstInvalidNumberFromInputfile(tt.args.preamble, tt.args.input); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("FindFirstInvalidNumberFromInputfile() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestSearchSummandsForNumber(t *testing.T) {
	type args struct {
		ints []int
		i    int
	}
	tests := []struct {
		name string
		args args
		want []int
	}{
		{"", args{[]int{1, 2, 3}, 5}, []int{2, 3}},
		{"", args{[]int{1, 2, 3, 4, 5, 6, 7, 8}, 15}, []int{1, 2, 3, 4, 5}},
		{"", args{[]int{1, 10, 2, 9, 5, 6, 7, 8}, 21}, []int{10, 2, 9}},
	}
		for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := SearchConsecutiveSummands(tt.args.ints, tt.args.i); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("SearchConsecutiveSummands() = %v, want %v", got, tt.want)
			}
		})
	}
}