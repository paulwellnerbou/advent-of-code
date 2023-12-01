import { expect, test } from "bun:test";
import { collectProcessedLines } from "./file-utils"

test("test reading file", () => {
  const lines = collectProcessedLines<string>("./common/test-file.txt", (line) => { console.debug(line); return line; }).then(lines => {
    expect(lines).toEqual(["line 1", "line 2", "line 3"]);
  })
})
