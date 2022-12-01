package day4

import (
	"strings"
)

type Passport struct {
	byr string
	iyr string
	eyr string
	hgt string
	hcl string
	ecl string
	pid string
	cid string
}

func PassportfromString(passportString string) Passport {
	fields := strings.Split(passportString, " ")
	passport := Passport{}
	for _, field := range fields {
		fieldValue := strings.Split(field, ":")
		switch fieldValue[0] {
		case "byr":
			passport.byr = fieldValue[1]
		case "iyr":
			passport.iyr = fieldValue[1]
		case "eyr":
			passport.eyr = fieldValue[1]
		case "hgt":
			passport.hgt = fieldValue[1]
		case "hcl":
			passport.hcl = fieldValue[1]
		case "ecl":
			passport.ecl = fieldValue[1]
		case "pid":
			passport.pid = fieldValue[1]
		case "cid":
			passport.cid = fieldValue[1]
		}
	}
	return passport
}
