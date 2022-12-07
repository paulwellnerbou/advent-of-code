import { sum } from "../../common/utils"
import { CommandLine, Directory } from "./CommandLine"

export class Day07 {

    part1(lines: string[]): number {
        const fs = this.parseInput(lines)
        return this.sizeOfAllDirectoriesWithTotalSizeAtMost(fs, 100000)
    }

    part2(lines: string[]): number {
        const fs = this.parseInput(lines)
        const fsSize = fs.calculateSize()
        const necessaryFreeSpace = 30000000
        const totalSize = 70000000
        const spaceThatNeedsToBeFreed = - totalSize + necessaryFreeSpace + fsSize
        return this.findAllDirectoriesWithSizeAtLeast(fs, spaceThatNeedsToBeFreed).sort((n1, n2) => n1 - n2)[0]
    }

    findAllDirectoriesWithSizeAtLeast(filesystem: Directory, atLeast: number): number[] {
        return filesystem.findDirectory(dir => dir.calculateSize() >= atLeast).map(dir => dir.calculateSize())
    }

    sizeOfAllDirectoriesWithTotalSizeAtMost(filesystem: Directory, atMost: number): number {
        return sum(filesystem.findDirectory(dir => dir.calculateSize() <= atMost).map(dir => dir.calculateSize()))
    }

    parseInput(lines: string[]): Directory {
        const commandLine = new CommandLine()
        lines.forEach(line => commandLine.parse(line))
        return commandLine.filesystem
    }
}
