import * as fs from "fs"

export function readInputFileSplitBy (
    filename: string,
    splitBy = "\n"
): string[] {
    return fs
        .readFileSync(filename, "utf8")
        .split(splitBy)
        .filter(line => line)
}

