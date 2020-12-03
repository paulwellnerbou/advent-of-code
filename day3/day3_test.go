package day3

import "testing"

func Test_countTreesWhileTraversingPartOne(t *testing.T) {
	testArea := readAreaFromFile("./testinput")
	foundTrees := countTreesWhileTraversing(testArea, Slope{3, 1})

	if foundTrees != 7 {
		t.Errorf("Expected 7 but found %v", foundTrees)
	}
}

func Test_multiplyAllRunsPartTwo(t *testing.T) {
	testArea := readAreaFromFile("./testinput")
	product := partTwo(testArea)

	if product != 336 {
		t.Errorf("Expected 336 but found %v", product)
	}
}

func Test_day3main(t *testing.T) {
	day3main()
}

func Test_countTreesWhileTraversing(t *testing.T) {
	type args struct {
		area  Area
		slope Slope
	}
	testArea := readAreaFromFile("./testinput")
	tests := []struct {
		name string
		args args
		want int
	}{
		{name: "Right 1, down 1", args: args{testArea, Slope{1, 1}}, want: 2},
		{name: "Right 3, down 1", args: args{testArea, Slope{3, 1}}, want: 7},
		{name: "Right 5, down 1", args: args{testArea, Slope{5, 1}}, want: 3},
		{name: "Right 7, down 1", args: args{testArea, Slope{7, 1}}, want: 4},
		{name: "Right 1, down 2", args: args{testArea, Slope{1, 2}}, want: 2},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := countTreesWhileTraversing(tt.args.area, tt.args.slope); got != tt.want {
				t.Errorf("countTreesWhileTraversing() = %v, want %v", got, tt.want)
			}
		})
	}
}