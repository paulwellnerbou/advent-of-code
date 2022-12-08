import { sum } from "../../common/utils"

interface Coord {
    x: number
    y: number
}

export class Forest {
    trees: number[][] = []

    constructor (strings: string[]) {
        this.readForest(strings)
    }

    readForest (input: string[]) {
        this.trees = input.map(line => line.split("").map(c => +c))
    }

    getTreeHeight (coord: Coord): number {
        return this.trees[coord.y][coord.x]
    }

    calculateScenicScore (coord: Coord): number {
        const reduceFn = (previousValue: number, currentValue: number, currentIndex: number, array: number[]) => {
            if (currentValue >= this.getTreeHeight(coord)) {
                array.splice(1)
            }
            return previousValue + 1
        }

        return this.process(coord, reduceFn, 0).reduce((previousValue, currentValue) => previousValue * currentValue)
    }

    isVisible (coord: Coord): number {
        const reduceFn = (previousValue: number, currentValue: number, currentIndex: number, array: number[]) => {
            if (currentValue >= this.getTreeHeight(coord)) {
                array.splice(1)
                return 0
            }
            return 1
        }
        return this.process(coord, reduceFn, 1).reduce((previousValue, currentValue) => previousValue + currentValue)
    }

    process (coord: Coord, reduceFn: (previousValue: number, currentValue: number, currentIndex: number, array: number[]) => number, initialValue = 0) : number[] {
        return [
            { index: coord.x, line: this.trees[coord.y]},
            { index: coord.y, line: this.trees.map(line => line[coord.x])}
        ].map(v => [v.line.slice(0, v.index).reverse(), v.line.slice(v.index + 1, this.trees.length)]).flat().map(line => line
            .reduce(reduceFn, initialValue)
        )
    }

    countVisibleTrees (): number {
        return sum(this.trees.map((treeline, y) => {
            return treeline.filter((height, x) => this.isVisible({x: x, y: y})).length
        }))
    }

    detectTreeWithBestScenicView (): number {
        return Math.max(...this.trees.map((treeline, y) => {
            return Math.max(...treeline.map((height, x) => this.calculateScenicScore({x: x, y: y})))
        }))
    }
}
