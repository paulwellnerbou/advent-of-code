package common

import (
	"bufio"
	"log"
	"os"
	"strconv"
)

func ReadInput() []int {
	file, err := os.Open("./input")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	var inputs []int
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		i, err := strconv.Atoi(scanner.Text())
		if err != nil {
			log.Fatal(err)
		}
		inputs = append(inputs, i)
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
	return inputs
}
