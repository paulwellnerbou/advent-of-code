import { readInputFileSplitBy } from "../../common/file-utils";
import { Forest } from "./Forest";

const TEST_INPUT_FILE = __dirname + "/../input-test.txt"

describe("Tests for Part 2", () => {
    const forest = new Forest(readInputFileSplitBy(TEST_INPUT_FILE));

    test("count visible trees", () => {
        expect(forest.countScenicTreesInDirection(2, 1, 0, -1)).toBe(1)
        expect(forest.countScenicTreesInDirection(2, 1, -1, 0)).toBe(1)
        expect(forest.countScenicTreesInDirection(2, 1, 1, 0)).toBe(2)
        expect(forest.countScenicTreesInDirection(2, 1, 0, 1)).toBe(2)
    })

    test("calculate scenic score", () => {
        expect(forest.calculateScenicScore(2, 1)).toBe(4)
        expect(forest.calculateScenicScore(2, 3)).toBe(8)
    })

    test("detect best scenic view", () => {
        expect(forest.detectTreeWithBestScenicView()).toBe(8)
    })
})

describe("Tests for Part 1", () => {
    const forest = new Forest(readInputFileSplitBy(TEST_INPUT_FILE));

    test("count visible trees from outside", () => {
        expect(forest.countVisibleTrees()).toBe(21)
    })

    test("test visibility of trees in forest from outside", () => {
        expect(forest.get(1, 1)).toBe(5)
        expect(forest.get(1, 0)).toBe(0)
        expect(forest.get(0, 1)).toBe(2)

        expect(forest.get(0, 0)).toBe(3)
        expect(forest.isVisible(0, 0)).toBeTruthy()

        expect(forest.get(1, 1)).toBe(5)
        expect(forest.isVisible(1, 1)).toBeTruthy()

        expect(forest.get(2, 1)).toBe(5)
        expect(forest.isVisible(1, 1)).toBeTruthy()

        expect(forest.get(3, 1)).toBe(1)
        expect(forest.isVisible(3, 1)).toBeFalsy()

        expect(forest.get(1, 2)).toBe(5)
        expect(forest.isVisible(1, 1)).toBeTruthy()

        expect(forest.get(2, 2)).toBe(3)
        expect(forest.isVisible(2, 2)).toBeFalsy()

        expect(forest.get(3, 2)).toBe(3)
        expect(forest.isVisible(3, 2)).toBeTruthy()

        expect(forest.get(1, 3)).toBe(3)
        expect(forest.isVisible(1, 3)).toBeFalsy()

        expect(forest.get(2, 3)).toBe(5)
        expect(forest.isVisible(2, 3)).toBeTruthy()

        expect(forest.get(3, 3)).toBe(4)
        expect(forest.isVisible(3, 3)).toBeFalsy()

        expect(forest.get(4, 3)).toBe(9)
        expect(forest.isVisible(4, 3)).toBeTruthy()

        expect(forest.get(3, 4)).toBe(9)
        expect(forest.isVisible(3, 4)).toBeTruthy()

        expect(forest.get(4, 4)).toBe(0)
        expect(forest.isVisible(4, 4)).toBeTruthy()
    })
})
