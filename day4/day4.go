package day4

import (
	"../common"
	"fmt"
)

func day4main() {
	testPasswords := ToPassports(common.ReadInput("input"))
	validPassports := countValidPassports(testPasswords)
	println("Part One:")
	fmt.Printf("Found %v valid passwords.\n", validPassports)
	println()
}

func countValidPassports(passports []Passport) int {
	validPasswords := 0
	for _, p := range passports {
		if ValidatePassword(p) {
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
