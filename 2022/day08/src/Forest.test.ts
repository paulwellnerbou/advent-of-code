import { readInputFileSplitBy } from "../../common/file-utils";
import { Forest } from "./Forest";

const TEST_INPUT_FILE = __dirname + "/../input-test.txt"

describe("Tests for Part 2", () => {
    const forest = new Forest(readInputFileSplitBy(TEST_INPUT_FILE));

    test("calculate scenic score", () => {
        expect(forest.calculateScenicScore({x: 2, y: 1})).toBe(4)
        expect(forest.calculateScenicScore({x: 2, y: 3})).toBe(8)
    })

    test("detect best scenic view", () => {
        expect(forest.detectTreeWithBestScenicView()).toBe(8)
    })
})

describe("Tests for Part 1", () => {
    const forest = new Forest(readInputFileSplitBy(TEST_INPUT_FILE));

    test("count visible trees from outside", () => {
        expect(forest.countVisibleTrees()).toBe(21)
        expect(forest.countVisibleTrees()).toBe(21)
    })

    test("test visibility of trees in forest from outside", () => {
        expect(forest.getTreeHeight({x: 1, y: 1})).toBe(5)
        expect(forest.getTreeHeight({x: 1, y: 0})).toBe(0)
        expect(forest.getTreeHeight({x: 0, y: 1})).toBe(2)

        expect(forest.getTreeHeight({x: 0, y: 0})).toBe(3)
        expect(forest.isVisible({x: 0, y: 0})).toBeTruthy()

        expect(forest.getTreeHeight({x: 1, y: 1})).toBe(5)
        expect(forest.isVisible({x: 1, y: 1})).toBeTruthy()

        expect(forest.getTreeHeight({x: 2, y: 1})).toBe(5)
        expect(forest.isVisible({x: 1, y: 1})).toBeTruthy()

        expect(forest.getTreeHeight({x: 3, y: 1})).toBe(1)
        expect(forest.isVisible({x: 3, y: 1})).toBeFalsy()

        expect(forest.getTreeHeight({x: 1, y: 2})).toBe(5)
        expect(forest.isVisible({x: 1, y: 1})).toBeTruthy()

        expect(forest.getTreeHeight({x: 2, y: 2})).toBe(3)
        expect(forest.isVisible({x: 2, y: 2})).toBeFalsy()

        expect(forest.getTreeHeight({x: 3, y: 2})).toBe(3)
        expect(forest.isVisible({x: 3, y: 2})).toBeTruthy()

        expect(forest.getTreeHeight({x: 1, y: 3})).toBe(3)
        expect(forest.isVisible({x: 1, y: 3})).toBeFalsy()

        expect(forest.getTreeHeight({x: 2, y: 3})).toBe(5)
        expect(forest.isVisible({x: 2, y: 3})).toBeTruthy()

        expect(forest.getTreeHeight({x: 3, y: 3})).toBe(4)
        expect(forest.isVisible({x: 3, y: 3})).toBeFalsy()

        expect(forest.getTreeHeight({x: 4, y: 3})).toBe(9)
        expect(forest.isVisible({x: 4, y: 3})).toBeTruthy()

        expect(forest.getTreeHeight({x: 3, y: 4})).toBe(9)
        expect(forest.isVisible({x: 3, y: 4})).toBeTruthy()

        expect(forest.getTreeHeight({x: 4, y: 4})).toBe(0)
        expect(forest.isVisible({x: 4, y: 4})).toBeTruthy()
    })
})
