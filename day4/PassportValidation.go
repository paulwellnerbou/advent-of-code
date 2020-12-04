package day4

import (
	"reflect"
)

func ValidatePassword(passport Passport) bool {
	v := reflect.ValueOf(passport)
	for i := 0; i < v.NumField(); i++ {
		if v.Type().Field(i).Name != "cid" && v.Field(i).String() == "" {
			return false
		}
	}
	return true
}