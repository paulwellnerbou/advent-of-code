package day4

import (
	"reflect"
	"regexp"
	"strconv"
	"strings"
)

type PassportValidator interface {
	validate(passport Passport) bool
}

type PassportValidatorPartOne struct{}
type PassportValidatorPartTwo struct{}

func (pv PassportValidatorPartOne) validate(passport Passport) bool {
	v := reflect.ValueOf(passport)
	for i := 0; i < v.NumField(); i++ {
		if v.Type().Field(i).Name != "cid" && v.Field(i).String() == "" {
			return false
		}
	}
	return true
}

func (pv PassportValidatorPartTwo) validate(passport Passport) bool {
	return PassportValidatorPartOne{}.validate(passport) &&
		strNumBetween(passport.byr, 1920, 2002) &&
		strNumBetween(passport.iyr, 2010, 2020) &&
		strNumBetween(passport.eyr, 2020, 2030) &&
		isValidPassportId(passport.pid) &&
		isValidEyeColor(passport.ecl) && validateHeight(passport.hgt) && isValidHexColor(passport.hcl)
}

func isValidPassportId(pid string) bool {
	return len(pid) == 9 && strNumBetween(pid, 1, 999999999)
}

func isValidHexColor(hcl string) bool {
	r, _ := regexp.Compile("#[0-9a-z]{6}")
	return r.MatchString(hcl)
}

func validateHeight(hgt string) bool {
	unit := hgt[len(hgt)-2:]
	height, err := strconv.Atoi(hgt[:len(hgt)-2])
	if err != nil {
		return false
	}
	switch unit {
	case "cm":
		return height >= 150 && height <= 193
	case "in":
		return height >= 59 && height <= 76
	default:
		return false
	}
}

func isValidEyeColor(hairColorString string) bool {
	validHairColors := strings.Split("amb blu brn gry grn hzl oth", " ")
	for _, hairColor := range validHairColors {
		if hairColorString == hairColor {
			return true
		}
	}
	return false
}

func strNumBetween(stringNumber string, min int, max int) bool {
	num, _ := strconv.Atoi(stringNumber)
	return num <= max && num >= min
}
