package day2

import "testing"

func TestValidatePasswordPartTwo(t *testing.T) {
	validator := ValidatorPartTwo{}

	parameters := []struct {
		inputPolicy PasswordPolicy
		inputPassword string
		expected bool
	} {
		{PasswordPolicy{char: "a", min:  1, max:  3,}, "abcde", true},
		{PasswordPolicy{char: "a", min:  1, max:  3,}, "xxxabcde", false},
		{PasswordPolicy{char: "b", min:  1, max:  3,}, "cdefg", false},
		{PasswordPolicy{char: "c", min:  2, max:  9,}, "ccccccccc", false},
		{PasswordPolicy{char: "c", min:  2, max:  4,}, "cccx", true},
	}

	for i := range parameters {
		actual := validator.ValidatePassword(parameters[i].inputPolicy, parameters[i].inputPassword)
		if actual != parameters[i].expected {
			t.Errorf("Expected password '%s' not to be validated %t by policy %#v", parameters[i].inputPassword, parameters[i].expected, parameters[i].inputPolicy)
		}
	}
}

func TestValidatePasswordPartOne(t *testing.T) {
	passwordPolicy := PasswordPolicy{
		char: "a",
		min:  1,
		max:  3,
	}

	validator := ValidatorPartOne{}

	if validator.ValidatePassword(passwordPolicy, "bc") {
		t.Errorf("Expected password '%s' not to be validated by policy %#v", "bc", passwordPolicy)
	}
	if !validator.ValidatePassword(passwordPolicy, "abc") {
		t.Errorf("Expected password '%s' to be validated by policy %#v", "abc", passwordPolicy)
	}
	if validator.ValidatePassword(passwordPolicy, "aabcaa") {
		t.Errorf("Expected password '%s' not to be validated by policy %#v", "aabcaa", passwordPolicy)
	}
}
