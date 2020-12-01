package main

import (
	"bufio"
	"log"
	"os"
	"strconv"
)

func main() {
	inputs := readInput()
	println(searchSumAndMultiply2(inputs, 2020))
	println(searchSumAndMultiply3(inputs, 2020))
}

func searchSumAndMultiply3(input []int, searchedSum int) int {
	for _, number := range input {
		n := searchSumAndMultiply2(input, searchedSum-number)
		if n > 0 {
			return n*number
		}
	}
	return 0
}

func searchSumAndMultiply2(input []int, searchedSum int) int {
	for _, first := range input {
		for _, second := range input {
			if first + second == searchedSum {
				return first * second
			}
		}
	}
	return 0
}

func readInput() []int {
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