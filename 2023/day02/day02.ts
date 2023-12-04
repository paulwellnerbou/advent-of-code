import { sumAllLineResults } from "../common/file-utils"

interface Game {
    id: number,
    turns: SetOfCubes[],
}

interface SetOfCubes {
    [color: string]: number
}

export function powerOfSetOfCubes(setOfCubes: SetOfCubes): number {
    return Object.values(setOfCubes).reduce((acc, val) => acc * val)
}

export function minimalSetOfCubes<T>(turns: SetOfCubes[], callback: (setOfCubes: SetOfCubes) => T) {
    const minimalSetOfCubes = {
        "red": 0,
        "green": 0,
        "blue": 0,
    } as SetOfCubes

    turns.forEach(turn => {
        Object.keys(minimalSetOfCubes).forEach(key => {
            minimalSetOfCubes[key] = Math.max(minimalSetOfCubes[key], turn[key] || 0)
        })
    })
    return callback(minimalSetOfCubes)
}

export function parseLineToGame(line: string): Game {
    const [gameIdString, gameTurnsString] = line.split(": ")
    const gameId = parseInt(gameIdString.replace("Game ", ""))

    const gameTurns = gameTurnsString.split("; ").map(gameTurn => {
        const gameBag = {} as SetOfCubes
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

export function checkIfGameIsPossible(gameBag: SetOfCubes, gameTurns: SetOfCubes[]): boolean {
    for (const gameTurn of gameTurns) {
        for (const color in gameTurn) {
            if (gameBag[color] === undefined || gameBag[color] < gameTurn[color]) {
                return false
            }
        }
    }
    return true;
}

/**
 * process line for part 1
 */
export const idIfGameIsPossible = (line: string, bag: SetOfCubes): number => {
    const game = parseLineToGame(line)
    return checkIfGameIsPossible(
        bag,
        game.turns
    ) ? game.id : 0
}

/**
 * process line for part 2
 */
export const powerOfMinimalPossibleSetOfCubes = (line: string): number => {
    const game = parseLineToGame(line)
    return minimalSetOfCubes(game.turns, s => powerOfSetOfCubes(s))
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
    } as SetOfCubes
    return sumAllLineResults(import.meta.dir + "/input.txt", (line) => idIfGameIsPossible(line, bag))
}

export const day02part2 = async (): Promise<number> => {
    return sumAllLineResults(import.meta.dir + "/input.txt", (line) => powerOfMinimalPossibleSetOfCubes(line))
}
