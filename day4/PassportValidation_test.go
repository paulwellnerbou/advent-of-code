package day4

import (
	"testing"
)

func TestValidatePassword_partOne(t *testing.T) {
	type args struct {
		passport Passport
	}

	validatorPartOne := PassportValidatorPartOne{}
	tests := []struct {
		name string
		args args
		want bool
	}{
		{name: "empty password should not be valid", args: args{Passport{}}, want: false},
		{name: "all but hgt", args: args{PassportfromString("ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147")}, want: false},
		{name: "all but hgt and cid", args: args{PassportfromString("ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017")}, want: false},
		{name: "all but cid", args: args{PassportfromString("ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 hgt:183cm")}, want: true},
		{name: "all fields", args: args{PassportfromString("ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm")}, want: true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := validatorPartOne.validate(tt.args.passport); got != tt.want {
				t.Errorf("PassportValidatorPartOne.validate(%v) = %v, expected %v", tt.args.passport, got, tt.want)
			}
		})
	}
}

func TestValidatePassword_partTwo(t *testing.T) {
	type args struct {
		passport Passport
	}

	validatorPartTwo := PassportValidatorPartTwo{}
	tests := []struct {
		name string
		args args
		want bool
	}{
		{name: "invalid passport #1", args: args{PassportfromString("eyr:1972 cid:100 hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926")}, want: false},
		{name: "invalid passport #2", args: args{PassportfromString("iyr:2019 hcl:#602927 eyr:1967 hgt:170cm ecl:grn pid:012533040 byr:1946")}, want: false},
		{name: "invalid passport #3", args: args{PassportfromString("hcl:dab227 iyr:2012 ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277")}, want: false},
		{name: "invalid passport #4", args: args{PassportfromString("hgt:59cm ecl:zzz eyr:2038 hcl:74454a iyr:2023 pid:3556412378 byr:2007")}, want: false},
		{name: "valid passport #1", args: args{PassportfromString("pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f")}, want: true},
		{name: "valid passport #2", args: args{PassportfromString("eyr:2029 ecl:blu cid:129 byr:1989 iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm")}, want: true},
		{name: "valid passport #4", args: args{PassportfromString("hcl:#888785 hgt:164cm byr:2001 iyr:2015 cid:88 pid:545766238 ecl:hzl eyr:2022")}, want: true},
		{name: "valid passport #5", args: args{PassportfromString("iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719")}, want: true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := validatorPartTwo.validate(tt.args.passport); got != tt.want {
				t.Errorf("PassportValidatorPartTwo.validate(%v) = %v, expected %v", tt.args.passport, got, tt.want)
			}
		})
	}
}

func Test_isValidPassportId(t *testing.T) {
	type args struct {
		pid string
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		{name: "", args: args{pid: ""}, want: false},
		{name: "000000001", args: args{pid: "000000001"}, want: true},
		{name: "0123456789", args: args{pid: "0123456789"}, want: false},
	}
		for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := isValidPassportId(tt.args.pid); got != tt.want {
				t.Errorf("isValidPassportId() = %v, want %v", got, tt.want)
			}
		})
	}
}