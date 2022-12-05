import { group, range } from "../../common/utils"
import { CrateMover } from "./CrateMover"

export class Stacks {
    stacks: string[][] = []

    addStacksFromLines (line: string[]): void {
        line.forEach(line => {
            if (line.includes("[")) {
                this.stackCratesFromLine(line)
            }
        })
    }

    move (crateMover: CrateMover, ...moveStatements: number[]): void {
        crateMover.move(this.stacks, moveStatements[0], moveStatements[1], moveStatements[2])
    }

    stackCratesFromLine (line: string): void {
        group((line + " ").split(""), 4)
            .map(value => value.join("").replace("[", "").replace("]", "").trim())
            .forEach((value, index) => {
                this.createStackIfNotExists(index)
                if (value) {
                    this.addCratesToStackByIndex(index, value)
                }
            })
    }

    private addCratesToStackByIndex (stackIndex: number, ...crates: string[]) {
        this.createStackIfNotExists(stackIndex)
        if (crates) {
            this.stacks[stackIndex].push(...crates)
        }
    }

    getStack (number: number): string[] {
        return this.stacks[number - 1]
    }

    private createStackIfNotExists (stackIndex: number) {
        if (!this.stacks[stackIndex]) {
            this.stacks[stackIndex] = []
        }
    }

    topLineOfCrates (): string[] {
        return this.stacks.map(stack => stack[0])
    }

    toString(): string {
        const indexOfHighestCrane = Math.max(...this.stacks.map(s => s.length)) - 1
        return range(0, indexOfHighestCrane).map((value) => {
            return this.stacks.map(stack => {
                if (stack.length > value) {
                    return "[" + [...stack].reverse()[value] + "]"
                } else {
                    return "   "
                }
            }).join(" ")
        }).reverse().join("\n")
    }
}
