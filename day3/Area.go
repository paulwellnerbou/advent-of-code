package day3

type Area struct {
	field []string
}

func (a Area) Get(x int, y int) string {
	return string(a.field[y][x % len(a.field[y])])
}
