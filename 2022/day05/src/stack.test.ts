import { Stacks } from "./stacks"
import { readInputFileSplitBy } from "../../common/file-utils"
import { TEST_INPUT_FILE } from "./day05.test"
import { CrateMover9000 } from "./CrateMover"

describe("Tests for part 1, using CrateMover 9000", () => {
    const crateMover = new CrateMover9000()

    test("test visualisation to string", () => {
        const stacks = new Stacks()
        stacks.addStacksFromLines(readInputFileSplitBy(TEST_INPUT_FILE))
        console.log(stacks.toString())
    })

    test("test move several crate from one stack to another", () => {
        const stacks = new Stacks()
        stacks.addStacksFromLines(readInputFileSplitBy(TEST_INPUT_FILE))

        stacks.move(crateMover, 1, 2, 1)
        console.log(stacks.toString())
        expect(stacks.getStack(1)).toStrictEqual(["D", "N", "Z"])
        expect(stacks.getStack(2)).toStrictEqual(["C", "M"])
        expect(stacks.getStack(3)).toStrictEqual(["P"])

        stacks.move(crateMover, 3, 1, 3)
        console.log(stacks.toString())
        expect(stacks.getStack(1)).toStrictEqual([])
        expect(stacks.getStack(2)).toStrictEqual(["C", "M"])
        expect(stacks.getStack(3)).toStrictEqual(["Z", "N", "D", "P"])
    })

    test("test move one crate from one stack to another", () => {
        const stacks = new Stacks()
        stacks.addStacksFromLines(readInputFileSplitBy(TEST_INPUT_FILE))
        stacks.move(crateMover, 1, 2, 1)

        expect(stacks.getStack(1)).toStrictEqual(["D", "N", "Z"])
        expect(stacks.getStack(2)).toStrictEqual(["C", "M"])
        expect(stacks.getStack(3)).toStrictEqual(["P"])
    })

    test("test create stacks from file", () => {
        const stacks = new Stacks()
        stacks.addStacksFromLines(readInputFileSplitBy(TEST_INPUT_FILE))
        expect(stacks.getStack(1)).toStrictEqual(["N", "Z"])
        expect(stacks.getStack(2)).toStrictEqual(["D", "C", "M"])
        expect(stacks.getStack(3)).toStrictEqual(["P"])
    })

    test("test create stacks from line", () => {
        const stacks = new Stacks()
        stacks.stackCratesFromLine("[Z] [M] [P]")
        expect(stacks.getStack(1)).toStrictEqual(["Z"])
        expect(stacks.getStack(2)).toStrictEqual(["M"])
        expect(stacks.getStack(3)).toStrictEqual(["P"])
    })

    test("test create stacks from line with only one crate", () => {
        const stacks = new Stacks()
        stacks.stackCratesFromLine("    [D]    ")
        expect(stacks.getStack(1)).toStrictEqual([])
        expect(stacks.getStack(2)).toStrictEqual(["D"])
        expect(stacks.getStack(3)).toStrictEqual([])
    })
})
