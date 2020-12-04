package day4

import (
	"../common"
	"testing"
)

func Test_day4main(t *testing.T) {
	day4main()
}

func Test_countValidPassports(t *testing.T) {
	testPasswords := ToPassports(common.ReadInput("testinput"))
	validPassports := countValidPassports(testPasswords, PassportValidatorPartOne{})
	if validPassports != 2 {
		t.Errorf("Expected to find 2 valid passwords, but found %v", validPassports)
	}
}
