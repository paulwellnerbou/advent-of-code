import { readInputFileSplitBy } from "../../common/file-utils"
import { findCommonChars, priority } from "./day03-part1"
import { group, sum } from "../../common/utils"

export function printDay3Part2 (): void {
    console.log(
        "Solution of second puzzle:",
        day3part2(readInputFileSplitBy(__dirname + "/../input.txt")),
        "\n"
    )
}

export function day3part2 (lines: string[]): number {
    return sum(group(lines).map(group => priority(findBadgeInGroup(group))))
}

export function findBadgeInGroup (lines: string[]): string {
    if (lines.length !== 3) throw Error(`Expected only three in a group, but found ${lines.length}`)
    const commonChar = findCommonChars(findCommonChars(lines[0], lines[1]), lines[2])
    if (commonChar.length !== 1) throw Error(`Expected only one badge item, but found ${commonChar.length}: ${commonChar}`)

    return commonChar
}
