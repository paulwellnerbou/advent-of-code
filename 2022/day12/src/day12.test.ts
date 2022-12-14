import { contains, Coord, Day12, distinct } from "./day12"

const TEST_INPUT_FILE = __dirname + "/../input-test.txt"
const INPUT_FILE = __dirname + "/../input.txt"

describe("Day 12", () => {

    test("Part 1", () => {
        const day = new Day12()
        day.readHeightMapFromFile(INPUT_FILE)
        expect(day.findPathTurnByTurn()).toBe(412)
    })
    test("Part 2", () => {
        const day = new Day12()
        day.readHeightMapFromFile(INPUT_FILE)
        console.log("Part 2: ", day.findStartingPointWithShortestPath())
    })
})

describe("Tests", () => {
    const day = new Day12()
    day.readHeightMapFromFile(TEST_INPUT_FILE)

    test("test find best a to start with", () => {
        const dayPart2 = new Day12()
        dayPart2.readHeightMapFromFile(TEST_INPUT_FILE)
        const turns = dayPart2.findStartingPointWithShortestPath()
        expect(turns).toBe(29)
    })

    test("test find path by turns", () => {
        const turns = day.findPathTurnByTurn()
        expect(turns).toBe(31)
    })

    test("all next positions", () => {
        const nextPositions = day.allNextPositions([{ x: 0, y: 0}])
        expect(nextPositions).toHaveLength(2)
        expect(nextPositions).toEqual(expect.arrayContaining([{x: 1, y: 0}, {x: 0, y: 1}]));
    })

    test("test e found: not found", () => {
        const found = day.findHeightIn([{ x: 4, y: 2}])
        expect(found).toBeFalsy()
    })

    test("test e found: found", () => {
        const found = day.findHeightIn([{ x: 5, y: 2}])
        expect(found).toBeTruthy()
    })

    test("find best next positions with already visited positions", () => {
        const nextPositions = day.nextBestPositions({ x: 1, y: 0}, [{x: 0, y: 0}])
        expect(nextPositions).toHaveLength(2)
        expect(nextPositions).toEqual(expect.arrayContaining([{x: 2, y: 0}, {x: 1, y: 1}]));
    })

    test("find best next positions", () => {
        const nextPositions = day.nextBestPositions({ x: 4, y: 2})
        expect(nextPositions).toHaveLength(4)
        expect(nextPositions[0]).toStrictEqual({x: 5, y: 2})
    })

    test("test get height of", () => {
        expect(day.getHeightOf(0, 0)).toBe("S")

        expect(day.getHeightOf(4, 2)).toBe("z")
        expect(day.getHeightOfCoord({x: 4, y: 2})).toBe("z")

        expect(day.getHeightOf(5, 2)).toBe("E")
        expect(day.getHeightOfCoord({x: 5, y: 2})).toBe("E")

        expect(day.getHeightOf(4, 3)).toBe("u")
        expect(day.getHeightOfCoord({x: 4, y: 3})).toBe("u")
    })

    test("test calculation of next possible positions", () => {
        let nextPositions = day.nextPositions(day.detectStartPosition())
        expect(nextPositions).toHaveLength(2)
        expect(nextPositions).toEqual(expect.arrayContaining([{x: 1, y: 0}, {x: 0, y: 1}]));

        nextPositions = day.nextPositions({x: 2, y: 0})
        expect(nextPositions).toHaveLength(2)
        expect(nextPositions).toContainEqual({x: 1, y: 0})
        expect(nextPositions).toContainEqual({x: 2, y: 1})
    })

    test("test reading height map", () => {
        day.readHeightMapFromFile(TEST_INPUT_FILE)
        expect(day.heightMap[0].join("")).toBe("Sabqponm")
        expect(day.detectStartPosition()).toStrictEqual({x: 0, y: 0})
    })
})

describe("Tests for helper methods", () => {

    test("test contains", () => {
        const coords = [ { x: 1, y: 0 }, { x: 0, y: 1 } ]
        expect(contains(coords, { x: 0, y: 0 })).toBeFalsy()
    })

    test("test contains", () => {
        const coords = [{ x: 1, y: 0}, {x: 0, y: 0}, {x: 2, y: 3}, {x: 2, y: 4}]
        expect(contains(coords, {x: 2, y: 3})).toBeTruthy()
        expect(contains(coords, {x: 2, y: 6})).toBeFalsy()
    })

    test("test distinct with duplicates", () => {
        const coords = [{ x: 1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 0}]
        const distinctCoords = distinct(coords)
        expect(distinctCoords).toHaveLength(2)
        expect(distinctCoords).toEqual(expect.arrayContaining([{ x: 1, y: 0}, {x: 0, y: 0}]))
    })

    test("test distinct without duplicates", () => {
        const coords = [{ x: 1, y: 0}, {x: 0, y: 0}]
        const distinctCoords = distinct(coords)
        expect(distinctCoords).toHaveLength(2)
        expect(distinctCoords).toEqual(expect.arrayContaining(coords))
    })
})
