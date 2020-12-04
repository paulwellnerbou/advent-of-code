package day4

import (
	"../common"
	"fmt"
)

func day4main() {
	passports := ToPassports(common.ReadInput("input"))
	println("Part One:")
	fmt.Printf("Found %v valid passwords.\n", countValidPassports(passports, PassportValidatorPartOne{}))
	println()

	println("Part Two:")
	fmt.Printf("Found %v valid passwords.\n", countValidPassports(passports, PassportValidatorPartTwo{}))
	println()
}

func countValidPassports(passports []Passport, validator PassportValidator) int {
	validPasswords := 0
	for _, p := range passports {
		if validator.validate(p) {
			validPasswords ++
		}
	}
	return validPasswords
}

func ToPassportRecords(input []string) []string {
	var passportStrings []string
	passportString := ""
	for _, line := range input {
		if line == "" {
			if passportString != "" {
				passportStrings = append(passportStrings, passportString)
				passportString = ""
			}
		} else {
			passportString += " " + line
		}
	}
	if passportString != "" {
		passportStrings = append(passportStrings, passportString)
	}
	return passportStrings
}

func ToPassports(input []string) []Passport {
	var passports []Passport
	for _, line := range ToPassportRecords(input) {
		passports = append(passports, PassportfromString(line))
	}
	return passports
}
