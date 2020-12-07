package day5

import (
	"../common"
	"fmt"
	"sort"
)

func main() {
	planeSeats := PlaneSeats{
		numberOfRows:    128,
		numberOfColumns: 8,
	}

	seatIds := ToSeatIds(planeSeats, common.ReadInput("input"))
	fmt.Printf("Day 5, Part One: Highest ID: %d\n", seatIds[len(seatIds)-1])
	fmt.Printf("Day 5, Part Two: My Seat ID: %d\n", FindMissingIdInBetween(seatIds))
}

func FindMissingIdInBetween(ids []int) int {
	for i, id := range ids {
		if i > 0 && ids[i-1] == id-2 {
			return id - 1
		}
	}
	return 0
}

func ToSeatIds(planeSeats PlaneSeats, input []string) []int {
	var seatIds []int
	for _, line := range input {
		coordinates := planeSeats.CalculateSeatCoordinates(line)
		seatIds = append(seatIds, coordinates.CalculateSeatId())
	}
	sort.Ints(seatIds)
	return seatIds
}
