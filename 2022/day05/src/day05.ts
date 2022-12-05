import { readInputFileSplitBy } from "../../common/file-utils"
import { Stacks } from "./stacks"
import { CrateMover, CrateMover9000 } from "./CrateMover"

export class Day05 {
    private readonly fileName: string
    private readonly _stacks = new Stacks()

    constructor (fileName: string) {
        this.fileName = fileName
    }

    get stacks (): Stacks {
        return this._stacks
    }

    process (crateMover: CrateMover) {
        this.readStacksFromFile()
        this.processMoveInstructions(crateMover)
        return this.topCrates()
    }

    parseMoveLine(line: string): number[] {
        return line.replace("move ", "")
            .replace(" from ", ",")
            .replace(" to ", ",")
            .split(",")
            .map(nr => +nr)
    }

    readStacksFromFile (): void {
        this._stacks.addStacksFromLines(readInputFileSplitBy(this.fileName))
    }

    processMoveInstructions (crateMover: CrateMover): void {
        readInputFileSplitBy(this.fileName).filter(line => line.startsWith("move")).forEach(line => {
            this._stacks.move(crateMover, ...this.parseMoveLine(line))
        })
    }

    topCrates (): string {
        return this.stacks.topLineOfCrates().join("")
    }
}
