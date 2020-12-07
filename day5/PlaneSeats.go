package day5

type PlaneSeats struct {
	numberOfRows int
	numberOfColumns int
}

type SeatCoordinates struct {
	rows Range
	columns Range
}

func (s *SeatCoordinates) CalculateSeatId() int {
	return s.rows.min * 8 + s.columns.min
}

type Range struct {
	min int
	max int
}

func (p *PlaneSeats) CalculateSeatCoordinates(seatString string) SeatCoordinates {
	seatCoordinates := SeatCoordinates{
		calculate(seatString, Range{0, p.numberOfRows - 1}, "F", "B"),
		calculate(seatString, Range{0, p.numberOfColumns - 1}, "L", "R"),
	}
	return seatCoordinates
}

func calculate(seatString string, indexRange Range, lowerMarker string, higherMarker string) Range {
	for _, c := range seatString {
		middle := CalculateMiddle(indexRange)
		switch string(c) {
		case higherMarker:
			indexRange.min = middle
		case lowerMarker:
			indexRange.max = middle - 1
		}
	}
	return indexRange
}

func CalculateMiddle(rowRange Range) int {
	return rowRange.min + ((rowRange.max + 1 - rowRange.min) / 2)
}
