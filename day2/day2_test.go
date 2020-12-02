package day2

import (
	"testing"
)

func TestDay1Main(t *testing.T) {
	day2main()
}

func TestCountValidPasswords(t *testing.T) {
	input := []string{"1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"}
	count := countValidPasswords(input, ValidatorPartOne{})
	if count != 2 {
		t.Errorf("Expected 2 valid passwords, got %d", count)
	}
}

func TestParsePassword(t *testing.T) {
	policy, password := parsePassword("1-3 a: pass")

	expectedPasswordPolicy := PasswordPolicy{
		char: "a",
		min:  1,
		max:  3,
	}
	if password != "pass" {
		t.Logf("Expected 'pass' but got '%s'", password)
		t.Fail()
	}

	if policy != expectedPasswordPolicy {
		t.Logf("Expected %#v but got %#v", expectedPasswordPolicy, policy)
		t.Fail()
	}
}
