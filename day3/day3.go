package day3

import (
	"../common"
)

type Slope struct {
	right int
	down int
}

func day3main() {
	area := readAreaFromFile("input")
	println("Part One:")
	println(countTreesWhileTraversing(area, Slope{3, 1}))
	println()

	println("Part Two:")
	product := partTwo(area)
	println(product)
	println()
}

func partTwo(area Area) int {
	slopes := []Slope{
		{1, 1},
		{3, 1},
		{5, 1},
		{7, 1},
		{1, 2},
	}
	product := 1
	for _, slope := range slopes {
		product *= countTreesWhileTraversing(area, slope)
	}
	return product
}

func readAreaFromFile(inputfile string) Area {
	var input = common.ReadInput(inputfile)
	area := Area{field: input}
	return area
}

func countTreesWhileTraversing(area Area, slope Slope) int {
	position := struct {
		x int
		y int
	}{x: slope.right, y: slope.down}
	foundTrees := 0
	for position.y < len(area.field) {
		found := area.Get(position.x, position.y)
		if found == "#" {
			foundTrees++
		}
		position.x += slope.right
		position.y += slope.down
	}

	return foundTrees
}
