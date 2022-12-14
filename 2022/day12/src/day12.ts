import { readInputFileSplitBy } from "../../common/file-utils"

const INPUT_FILE = __dirname + "/../input.txt"

export function distinct (coords: Coord[]) {
    return coords.filter((coord, index, array) => array.findIndex(c => c.x == coord.x && c.y == coord.y) === index)
}

export function contains (haystack: Coord[], needle: Coord) {
    return haystack.findIndex(c => c.x == needle.x && c.y == needle.y) > 0
}

export function day12Part1 () {
    const day = new Day12()
    day.readHeightMapFromFile(INPUT_FILE)
    console.log("Day 12, Part 1: \n")
    console.log("Shortest path: ", day.findPathTurnByTurn())
}

export function day12Part2 () {
    const day = new Day12()
    day.readHeightMapFromFile(INPUT_FILE)
    console.log("Day 12, Part 2: \n")
    console.log("Shortest path from best starting point: ", day.findStartingPointWithShortestPath())
}

export interface Coord {
    x: number
    y: number
}

export class Day12 {

    heightMap: string[][] = []

    directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

    reachableCondition = (currentHeight: number, nextHeight: number) => currentHeight <= nextHeight + 1

    findStartingPointWithShortestPath (): number {
        this.reachableCondition = (currentHeight: number, nextHeight: number) => nextHeight <= currentHeight + 1
        return this.findPathTurnByTurn(this.detectStartPosition("E"), "a")
    }

    findPathTurnByTurn (start: Coord = this.detectStartPosition(), searchForHeight = "E"): number {
        let currentPositions = [start]
        const visitedPositions = [start]
        let stepCounter = 0

        while (!this.eFound(currentPositions, searchForHeight)) {
            currentPositions = distinct(this.allNextPositions(currentPositions)).filter((coord) => !contains(visitedPositions, coord))
            stepCounter++
            visitedPositions.push(...currentPositions)
        }
        return stepCounter
    }

    allNextPositions (coords: Coord[]): Coord[] {
        return coords.map(c => this.nextPositions(c)).flat()
    }

    eFound (currentPositions: Coord[], searchFor = "E") {
        return currentPositions.findIndex(coord => this.getHeightOfCoord(coord) == searchFor) >= 0
    }

    getHeightOfCoord (nextPosition: Coord): string {
        return this.getHeightOf(nextPosition.x, nextPosition.y)
    }

    getHeightOf (x: number, y: number): string {
        return this.heightMap[y][x]
    }

    nextPositions (start: Coord): Coord[] {
        const possibleNextPositions: Coord[] = []
        this.directions.forEach(direction => {
            if (this.isInRange(start, direction) && this.isReachable(start, direction)) {
                possibleNextPositions.push({
                    x: start.x + direction[0],
                    y: start.y + direction[1]
                })
            }
        })

        return possibleNextPositions
    }

    isReachable (start: Coord, direction: number[]) {
        let heightOfNextStep = this.getHeightOf(start.x + direction[0], start.y + direction[1])
        if (heightOfNextStep == "E") heightOfNextStep = "z"
        let currentHeight = this.getHeightOfCoord(start)
        if (currentHeight == "S") currentHeight = "a"
        return this.reachableCondition(heightOfNextStep.codePointAt(0)!, currentHeight.codePointAt(0)! + 1)
    }

    isInRange (start: Coord, direction: number[]): boolean {
        return start.y + direction[1] >= 0 && start.y + direction[1] < this.heightMap.length &&
            start.x + direction[0] >= 0 && start.x + direction[0] < this.heightMap[start.y + direction[1]].length
    }

    readHeightMapFromFile (fileName: string): void {
        this.readHeightMap(readInputFileSplitBy(fileName))
    }

    readHeightMap (lines: string[]): void {
        this.heightMap = lines.map(line => line.split(""))
    }

    detectStartPosition (searchFor = "S"): Coord {
        const y = this.heightMap.findIndex(line => line.indexOf(searchFor) >= 0)
        return {
            x: this.heightMap[y].findIndex(c => c == searchFor),
            y: y
        }
    }
}
