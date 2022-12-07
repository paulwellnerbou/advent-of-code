import { CommandLine } from "./CommandLine"

describe("Test CommandLine", () => {
    test("Changing to root directory", () => {
        const comandLine = new CommandLine()
        comandLine.parse("$ cd /")

        expect(comandLine.currentDirectory.name).toBe("/")
    })

    test("Changing to another directory", () => {
        const comandLine = new CommandLine()
        comandLine.parse("$ ls")
        comandLine.parse("dir abc")
        comandLine.parse("$ cd abc")
        expect(comandLine.filesystem.subdirectories.find(sd => sd.name == "abc")).not.toBeUndefined()
        expect(comandLine.currentDirectory.name).toBe("abc")

        comandLine.parse("$ ls")
        comandLine.parse("dir xyz")
        comandLine.parse("$ cd xyz")
        expect(comandLine.currentDirectory.name).toBe("xyz")
        expect(comandLine.filesystem.subdirectories.find(sd => sd.name == "xyz")).toBeUndefined()
        expect(comandLine.filesystem.subdirectories.find(sd => sd.name == "abc")!.subdirectories.find(sd => sd.name == "xyz")).not.toBeUndefined()
    })

    test("Changing to another directory, add files and calculate sizes", () => {
        const comandLine = new CommandLine()
        comandLine.parse("$ ls")
        comandLine.parse("dir abc")
        comandLine.parse("1 .hiddenfile")
        comandLine.parse("123 file")
        comandLine.parse("$ cd abc")
        comandLine.parse("$ ls")
        comandLine.parse("234 another-file")
        comandLine.parse("567 another-file2")

        expect(comandLine.filesystem.files).toHaveLength(2)
        expect(comandLine.filesystem.subdirectories).toHaveLength(1)
        expect(comandLine.filesystem.calculateSize()).toBe(234 + 567 + 1 + 123)

        const abc = comandLine.filesystem.subdirectories.find(sd => sd.name == "abc")

        expect(abc).not.toBeUndefined()
        expect(abc?.files).toHaveLength(2)
        expect(abc?.calculateSize()).toBe(234 + 567)
    })
})
