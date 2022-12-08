import { sum } from "../../common/utils"

export class Forest {
    trees: number[][] = []

    constructor (strings: string[]) {
        this.readForest(strings)
    }

    readForest (input: string[]) {
        this.trees = input.map(line => line.split("").map(c => +c))
    }

    isVisible (x: number, y: number): boolean {
        return this.isVisibleInDirection(x, y, 1, 0) ||
            this.isVisibleInDirection(x, y, 0, 1) ||
            this.isVisibleInDirection(x, y, -1, 0) ||
            this.isVisibleInDirection(x, y, 0, -1)
    }

    calculateScenicScore (x: number, y: number): number {
        return this.countScenicTreesInDirection(x, y, 1, 0) *
        this.countScenicTreesInDirection(x, y, 0, 1) *
        this.countScenicTreesInDirection(x, y, -1, 0) *
        this.countScenicTreesInDirection(x, y, 0, -1)
    }

    countScenicTreesInDirection (x: number, y: number, xIncrement: number, yIncrement: number): number {
        const currentHeight = this.get(x, y)
        let scenicTrees = 0
        while (x > 0 && y > 0 && x < this.trees.length - 1 && y < this.trees[x].length - 1) {
            const nextTree = this.get(x + xIncrement, y + yIncrement)
            scenicTrees++
            if (nextTree >= currentHeight) {
                return scenicTrees
            }
            x += xIncrement
            y += yIncrement
        }
        return scenicTrees
    }

    isVisibleInDirection (x: number, y: number, xIncrement: number, yIncrement: number): boolean {
        const currentHeight = this.get(x, y)
        while (x > 0 && y > 0 && x < this.trees.length - 1 && y < this.trees[x].length - 1) {
            const nextTree = this.get(x + xIncrement, y + yIncrement)
            if (nextTree >= currentHeight) {
                return false
            }
            x += xIncrement
            y += yIncrement
        }
        return true
    }

    get (x: number, y: number): number {
        if (this.trees.length <= y || this.trees[0].length <= x) {
            console.error(`Invalid coordinates ${x}, ${y} for Forest[${this.trees.length}, ${this.trees[0].length}]`)
        }
        return this.trees[y][x]
    }

    detectTreeWithBestScenicView (): number {
        return Math.max(...this.trees.map((treeline, y) => {
            return Math.max(...treeline.map((height, x) => this.calculateScenicScore(x, y)))
        }))
    }

    countVisibleTrees (): number {
        return sum(this.trees.map((treeline, y) => {
            return treeline.filter((height, x) => this.isVisible(x, y)).length
        }))
    }
}
