import { readInputFileSplitBy } from "../../common/file-utils"
import { range } from "../../common/utils"

export function day09part1 (fileName: string): number {
    return day09(fileName, 2)
}

export function day09part2 (fileName: string): number {
    return day09(fileName, 10)
}

function day09 (fileName: string, amountOfKnots: number): number {
    const d = new Day09(amountOfKnots)
    d.process(fileName)
    return d.distinctVisits().length
}

interface Coord {
    x: number
    y: number
}

export class Day09 {

    knots: Coord[] = []
    visited: string[] = ["0,0"]

    constructor (amountOfKnots: number) {
        range(1, amountOfKnots).forEach(() =>
            this.knots.push(this.newCoord())
        )
    }

    private newCoord (x = 0, y = 0) : Coord {
        return { x: x, y: y }
    }

    moveHead(str: string): void {
        const splitStr = str.split(" ");
        const direction = this.calculateDirectionFromStr(splitStr[0])
        const steps = +splitStr[1]

        for (let i = 0; i < steps; i++) {
            this.knots.forEach((knot, index, array) => {
                if(index == 0) {
                    knot.x += direction.x
                    knot.y += direction.y
                } else {
                    const follow = this.follow(array[index - 1], knot)
                    knot.x += follow.x
                    knot.y += follow.y
                }
            })
            const tail = this.tail()
            this.visited.push(`${tail.x},${tail.y}`)
        }
    }

    distinctVisits(): string[] {
        return this.visited.filter((coord, index, array) => array.indexOf(coord) == index);
    }

    private follow (head: Coord, tail: Coord): Coord {
        const moveTail = this.newCoord()
        if((Math.abs(head.x - tail.x) > 1) || (Math.abs(head.y - tail.y) > 1)) {
            moveTail.x += Math.sign(head.x - tail.x)
            moveTail.y += Math.sign(head.y - tail.y)
        }
        return moveTail
    }

    private calculateDirectionFromStr (str: string): Coord {
        switch (str) {
        case "R": return {x: 1, y: 0}
        case "U": return {x: 0, y: 1}
        case "D": return {x: 0, y: -1}
        case "L": return {x: -1, y: 0}
        default: throw Error(`Direction of ${str} not detected.`)
        }
    }

    process (fileName: string) {
        readInputFileSplitBy(fileName).forEach(line => this.moveHead(line))
    }

    head (): Coord {
        return this.knots.at(0)!
    }

    tail (): Coord {
        return this.knots.at(-1)!
    }
}
