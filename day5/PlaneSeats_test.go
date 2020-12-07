package day5

import "testing"

func TestPlaneSeats_calculateSeatId(t *testing.T) {
	tests := []struct {
		name       string
		planeSeats PlaneSeats
		seatString string
		want       int
	}{
		{"", PlaneSeats{128, 8}, "FBFBBFFRLR", 357},
		{"", PlaneSeats{128, 8}, "BFFFBBFRRR", 567},
		{"", PlaneSeats{128, 8}, "FFFBBBFRRR", 119},
		{"", PlaneSeats{128, 8}, "BBFFBBFRLL", 820},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			seatCoordinates := tt.planeSeats.CalculateSeatCoordinates(tt.seatString)
			if got := seatCoordinates.CalculateSeatId(); got != tt.want {
				t.Errorf("PlaneSeats(%d).CalculateSeatCoordinates(%s).CalculateSeatId() = %v, want %v", tt.planeSeats, tt.seatString, got, tt.want)
			}
		})
	}
}

func TestPlaneSeats_calculateCoordinates(t *testing.T) {
	tests := []struct {
		name       string
		planeSeats PlaneSeats
		seatString string
		want       SeatCoordinates
	}{
		{"", PlaneSeats{128, 8}, "FBFBBFFRLR", SeatCoordinates{Range{min: 44, max: 44}, Range{5, 5}}},
		{"", PlaneSeats{128, 8}, "BFFFBBFRRR", SeatCoordinates{Range{min: 70, max: 70}, Range{7, 7}}},
		{"", PlaneSeats{128, 8}, "FFFBBBFRRR", SeatCoordinates{Range{min: 14, max: 14}, Range{7, 7}}},
		{"", PlaneSeats{128, 8}, "BBFFBBFRLL", SeatCoordinates{Range{min: 102, max: 102}, Range{4, 4}}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.planeSeats.CalculateSeatCoordinates(tt.seatString); got != tt.want {
				t.Errorf("PlaneSeats(%d).CalculateSeatCoordinates(%s) = %v, want %v", tt.planeSeats, tt.seatString, got, tt.want)
			}
		})
	}
}

func TestCalculateMiddle(t *testing.T) {
	tests := []struct {
		name     string
		rowRange Range
		want     int
	}{
		{"", Range{0, 127}, 64},
		{"", Range{0, 1}, 1},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := CalculateMiddle(tt.rowRange); got != tt.want {
				t.Errorf("CalculateMiddle(%v) = %v, want %v", tt.rowRange, got, tt.want)
			}
		})
	}
}
