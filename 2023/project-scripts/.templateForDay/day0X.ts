import { sumAllLineResults } from "../common/file-utils"

export const processLine = (line: string): number => {
    return 0
}

export const printDay0X = async (): Promise<void> => {
    console.log("========== Day 0X ==========")
    console.log("Part 1: ", await day0Xpart1())
    console.log("Part 2: ", await day0Xpart2())
}

export const day0Xpart1 = async (): Promise<number> => {
    return sumAllLineResults(import.meta.dir + "/input.txt", (line) => processLine(line))
}

export const day0Xpart2 = async (): Promise<number> => {
    return sumAllLineResults(import.meta.dir + "/input-input.txt", (line) => processLine(line))
}
