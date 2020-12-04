package day4

import (
	"testing"
)

func TestValidatePassword(t *testing.T) {
	type args struct {
		passport Passport
	}

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
			if got := ValidatePassword(tt.args.passport); got != tt.want {
				t.Errorf("ValidatePassword(%v) = %v, expected %v", tt.args.passport, got, tt.want)
			}
		})
	}
}
