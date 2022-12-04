import { readInputFileSplitBy } from "./file-utils"

describe("Test reading input files", () => {
    test("reading file separated by two newlines", () => {
        const paragraphs = readInputFileSplitBy("./common/input-test.txt", "\n\n")

        expect(paragraphs).toHaveLength(5)
        expect(paragraphs).toContain("10000")
    })
})
