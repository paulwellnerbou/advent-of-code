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

    isReachableUp = (current: number, next: number) => {
        return next <= current + 1
    }

    findStartingPointWithShortestPath (): number {
        this.isReachableUp = (current: number, next: number) => {
            return current <= next + 1
        }
        return this.findPathTurnByTurn(this.detectStartPosition("E"), "a")
    }

    findPathTurnByTurn (start: Coord = this.detectStartPosition("S"), searchForHeight = "E"): number {
        let currentPositions = [start]
        const visitedPositions = [start]
        let stepCounter = 0

        while (!this.findHeightIn(currentPositions, searchForHeight)) {
            currentPositions = distinct(this.allNextPositions(currentPositions)).filter((coord) => !contains(visitedPositions, coord))
            if (currentPositions.length == 0) throw Error("No positions found.")
            stepCounter++
            visitedPositions.push(...currentPositions)
        }
        return stepCounter
    }

    allNextPositions (coords: Coord[]): Coord[] {
        return coords.map(c => this.nextPositions(c)).flat()
    }

    findHeightIn (currentPositions: Coord[], searchFor = "E") {
        return currentPositions.findIndex(coord => this.getHeightOfCoord(coord) == searchFor) >= 0
    }

    getHeightOfCoord (nextPosition: Coord): string {
        return this.getHeightOf(nextPosition.x, nextPosition.y)
    }

    getHeightOf (x: number, y: number): string {
        return this.heightMap[y][x]
    }

    nextBestPositions (start: Coord, visitedCoords: Coord[] = []): Coord[] {
        const nextPositions = this.nextPositions(start)

        return nextPositions
            .filter(coord => visitedCoords.findIndex(c => c.x == coord.x && c.y == coord.y) < 0)
            .sort((a, b) => (this.getHeightOfCoord(a).codePointAt(0)! - this.getHeightOfCoord(b).codePointAt(0)!))
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
        const heightOfNextStep = this.getHeightValue(this.getHeightOf(start.x + direction[0], start.y + direction[1]))
        const currentHeight = this.getHeightValue(this.getHeightOfCoord(start))
        const reachable = this.isReachableUp(currentHeight.codePointAt(0)!, heightOfNextStep.codePointAt(0)!)
        return reachable
    }

    getHeightValue (h: string) {
        return h == "E" ? "z" : h == "S" ? "a" : h
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

    detectStartPosition (searchForHeight = "S"): Coord {
        const y = this.heightMap.findIndex(line => line.indexOf(searchForHeight) >= 0)
        return {
            x: this.heightMap[y].findIndex(c => c == searchForHeight),
            y: y
        }
    }
}
