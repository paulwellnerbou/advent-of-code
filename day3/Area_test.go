package day3

import "testing"

func TestArea_Get(t *testing.T) {
	type args struct {
		x int
		y int
	}

	testinput := []string{
		"..##.......",
		"#...#...#..",
		".#....#..#.",
		"..#.#...#.#",
		".#...##..#.",
		"..#.##.....",
		".#.#.#....#",
		".#........#",
		"#.##...#...",
		"#...##....#",
		".#..#...#.#",
	}

	tests := []struct {
		name     string
		fields   []string
		args     args
		expected string
	}{
		{
			name:     "first coordinate",
			fields:   []string{".#"},
			args:     args{x: 0, y: 0},
			expected: ".",
		}, {
			name:     "second coordinate",
			fields:   []string{".#"},
			args:     args{x: 1, y: 0},
			expected: "#",
		}, {
			name:     "third coordinate, automatically expanded",
			fields:   []string{".#"},
			args:     args{x: 2, y: 0},
			expected: ".",
		}, {
			name:     "fourth coordinate, automatically expanded",
			fields:   []string{".#"},
			args:     args{x: 3, y: 0},
			expected: "#",
		}, {
			name:     "example from task",
			fields:   testinput,
			args:     args{x: 13, y: 3},
			expected: "#",
		}, {
			name:     "example from task",
			fields:   testinput,
			args:     args{x: 3, y: 3},
			expected: ".",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			a := Area{
				field: tt.fields,
			}
			if got := a.Get(tt.args.x, tt.args.y); got != tt.expected {
				t.Errorf("Get() = %v, expected %v", got, tt.expected)
			}
		})
	}
}
