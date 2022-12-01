package day2

import (
	"advent-of-code-2020/common"
	"fmt"
	"strconv"
	"strings"
)

type PasswordPolicy struct {
	char string
	min int
	max int
}

func day2main() {
	var input = common.ReadInput("input")
	fmt.Printf("Valid passwords found: %d\n", countValidPasswords(input, ValidatorPartOne{}))
	fmt.Printf("Valid passwords found: %d\n", countValidPasswords(input, ValidatorPartTwo{}))
}

func countValidPasswords(input []string, validator PasswordValidator) int {
	validPasswordCount := 0
	for _, str := range input {
		policy, password := parsePassword(str)
		if validator.ValidatePassword(policy, password) {
			validPasswordCount++
		}
	}
	return validPasswordCount
}

func parsePassword(inputString string) (PasswordPolicy, string) {
	splitted := strings.Split(inputString, ":")
	password := strings.TrimLeft(splitted[1], " ")

	policyStrings := strings.Split(splitted[0], " ")
	rangeNumbers := strings.Split(policyStrings[0], "-")
	rangeLow, _ := strconv.Atoi(rangeNumbers[0])
	rangeHigh, _ := strconv.Atoi(rangeNumbers[1])
	return PasswordPolicy{
		char: policyStrings[1],
		min:  rangeLow,
		max:  rangeHigh,
	}, password
}
