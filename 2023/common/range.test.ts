import { expect, test } from "bun:test";
import { range } from "./range";

test("test range", () => {
    expect(range(0, 1)).toEqual([0])
    expect(range(0, 2)).toEqual([0, 1])
    expect(range(3, 7)).toEqual([3, 4, 5, 6])
    expect(range(13, 13)).toEqual([])
})
