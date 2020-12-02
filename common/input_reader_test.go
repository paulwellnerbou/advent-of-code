package common

import (
	"testing"
)

func Test_ReadInput(t *testing.T) {
	var result = ReadInput("input")
	if result[0] != "1593" {
		t.Errorf("Expected 1593 but got %s", result[0])
	}
}
