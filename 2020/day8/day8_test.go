package day8

import (
	"reflect"
	"testing"
)

func TestDay8PartOne(t *testing.T) {
	Day8PartOne()
}

func TestDay8PartTwo(t *testing.T) {
	Day8PartTwo()
}

func TestProcessInstructions_noMutation(t *testing.T) {
	instructions := InstructionsFromFile("testinput")
	acc, exitCode := ProcessInstructions(instructions)

	if acc != 5 {
		t.Errorf("expected acc to be 5, but got %d", acc)
	}
	if exitCode != 1 {
		t.Errorf("expected acc to be 1, but got %d", exitCode)
	}
}

func TestProcessInstructions_correctMutation(t *testing.T) {
	instructions := InstructionsFromFile("testinput_mutated3")
	acc, exitCode := ProcessInstructions(instructions)

	if acc != 8 {
		t.Errorf("expected acc to be 5, but got %d", acc)
	}
	if exitCode != 0 {
		t.Errorf("expected acc to be 1, but got %d", exitCode)
	}
}

func TestMutateInstructions(t *testing.T) {
	type args struct {
		instructions []Instruction
		c            int
	}
	instructionsFromFile := InstructionsFromFile("testinput")
	tests := []struct {
		name string
		args args
		want []Instruction
	}{
		{"Mutating first instruction", args{instructionsFromFile, 0}, InstructionsFromFile("testinput_mutated0")},
		{"Mutating second instruction", args{instructionsFromFile, 1}, InstructionsFromFile("testinput_mutated1")},
		{"Mutating fourth instruction", args{instructionsFromFile, 3}, InstructionsFromFile("testinput_mutated3")},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := MutateInstructions(tt.args.instructions, tt.args.c); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("MutateInstructions() = %v, want %v", got, tt.want)
			}
		})
	}
}