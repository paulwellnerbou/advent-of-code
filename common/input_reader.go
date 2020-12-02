package common

import (
	"bufio"
	"log"
	"os"
	"strconv"
)

func ReadInput(inputFile string) []string {
	file, err := os.Open(inputFile)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	var inputs []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		inputs = append(inputs, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
	return inputs
}

func ToInts(input []string) []int {
	var numbers []int // empty numbers
	for _, digit := range input {
		n, _ := strconv.Atoi(digit)
		numbers = append(numbers, n) // build up numbers
	}
	return numbers
}
