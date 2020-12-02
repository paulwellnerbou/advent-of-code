package day2

import (
	"strings"
)

type PasswordValidator interface {
	ValidatePassword(policy PasswordPolicy, password string) bool
}

type ValidatorPartTwo struct {}

func (v ValidatorPartTwo) ValidatePassword(policy PasswordPolicy, password string) bool {
	return (string(password[policy.min-1]) == policy.char) != (string(password[policy.max-1]) == policy.char)
}

type ValidatorPartOne struct {}

func (v ValidatorPartOne) ValidatePassword(policy PasswordPolicy, password string) bool {
	count := strings.Count(password, policy.char)
	return policy.min <= count && count <= policy.max
}
