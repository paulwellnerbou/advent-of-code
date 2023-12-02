import { sumAllLineResults } from "../common/file-utils"

interface Game {
    id: number,
    turns: Bag[],
}

interface Bag {
    [color: string]: number
}

export function parseLineToGame(line: string): Game {
    const [gameIdString, gameTurnsString] = line.split(": ")
    const gameId = parseInt(gameIdString.replace("Game ", ""))

    const gameTurns = gameTurnsString.split("; ").map(gameTurn => {
        const gameBag = {} as Bag
        const turns = gameTurn.split(", ")
        for (const turn of turns) {
            const [count, color] = turn.split(" ")
            gameBag[color] = parseInt(count)
        }
        return gameBag
    })

    return {
        id: gameId,
        turns: gameTurns
    }
}

export function checkIfGameIsPossible(gameBag: Bag, gameTurns: Bag[]): boolean {
    for (const gameTurn of gameTurns) {
        for (const color in gameTurn) {
            if (gameBag[color] === undefined || gameBag[color] < gameTurn[color]) {
                return false
            }
        }
    }
    return true;
}

export const processLine = (line: string, bag: Bag): number => {
    const game = parseLineToGame(line)
    return checkIfGameIsPossible(
        bag,
        game.turns
    ) ? game.id : 0
}

export const printDay02 = async (): Promise<void> => {
    console.log("========== Day 02 ==========")
    console.log("Part 1: ", await day02part1())
    console.log("Part 2: ", await day02part2())
}

export const day02part1 = async (): Promise<number> => {
    // only 12 red cubes, 13 green cubes, and 14 blue cubes?
    const bag = {
        "red": 12,
        "green": 13,
        "blue": 14,
    } as Bag
    return sumAllLineResults(import.meta.dir + "/input.txt", (line) => processLine(line, bag))
}

export const day02part2 = async (): Promise<number> => {
    return sumAllLineResults(import.meta.dir + "/input.txt", (line) => processLine(line, {}))
}
