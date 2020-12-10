package day8

import (
	"advent-of-code-2020/common"
	"fmt"
	"strconv"
	"strings"
)

type Instruction struct {
	instruction string
	argument    string
}

func Day8PartOne() {
	instructions := InstructionsFromFile("input")
	processInstructions, _ := ProcessInstructions(instructions)

	fmt.Printf("Accumulator value: %d\n", processInstructions)
}

func InstructionsFromFile(file string) []Instruction {
	var instructions []Instruction
	for _, line := range common.ReadInput(file) {
		instructions = append(instructions, InstructionFromString(line))
	}
	return instructions
}

func Day8PartTwo() {
	instructions := InstructionsFromFile("input")
	exitCode := 1
	nextMutation := 0
	acc := 0

	for exitCode != 0 {
		mutatedInstructions := MutateInstructions(instructions, nextMutation)
		acc, exitCode = ProcessInstructions(mutatedInstructions)
		nextMutation++
	}

	fmt.Printf("mutation %d: acc, exitCode: %d, %d\n", nextMutation, acc, exitCode)
}

func MutateInstructions(instructions []Instruction, c int) []Instruction {
	mutatedInstructions := make([]Instruction, len(instructions))
	copy(mutatedInstructions, instructions)
	foundPlacesToMutate := 0
	for i, instruction := range mutatedInstructions {
		if instruction.instruction != "acc" {
			if foundPlacesToMutate == c {
				if instruction.instruction == "jmp" {
					mutatedInstructions[i].instruction = "nop"
					return mutatedInstructions
				}
				if instruction.instruction == "nop" {
					mutatedInstructions[i].instruction = "jmp"
					return mutatedInstructions
				}
			} else {
				foundPlacesToMutate++
			}
		}
	}
	return mutatedInstructions
}

func InstructionFromString(str string) Instruction {
	split := strings.Split(str, " ")
	return Instruction{
		instruction: strings.TrimSpace(split[0]),
		argument:    strings.TrimSpace(split[1]),
	}
}

func ProcessInstructions(instructions []Instruction) (int, int) {
	var alreadyProcessedInstructions []int
	acc := 0
	nextInstructionToProcess := 0
	for !Contains(alreadyProcessedInstructions, nextInstructionToProcess) {
		alreadyProcessedInstructions = append(alreadyProcessedInstructions, nextInstructionToProcess)
		if len(instructions) <= nextInstructionToProcess {
			return acc, 0
		}
		instruction := instructions[nextInstructionToProcess]
		switch instruction.instruction {
		case "nop":
			nextInstructionToProcess++
		case "acc":
			atoi, _ := strconv.Atoi(instruction.argument)
			acc += atoi
			nextInstructionToProcess++
		case "jmp":
			atoi, _ := strconv.Atoi(instruction.argument)
			nextInstructionToProcess += atoi
		}
	}
	return acc, 1
}

func Contains(ints []int, i int) bool {
	for _, b := range ints {
		if b == i {
			return true
		}
	}
	return false
}
