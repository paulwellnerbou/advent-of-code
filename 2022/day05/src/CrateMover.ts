export interface CrateMover {
    move (stacks: string[][], numberOfCrates: number, fromStack: number, toStack: number): void
}

export class CrateMover9000 implements CrateMover {

    move (stacks: string[][], amountOfCrates: number, fromStack: number, toStack: number): void {
        const items = stacks[fromStack - 1].splice(0, amountOfCrates).reverse()
        stacks[toStack - 1].unshift(...items)
    }
}

export class CrateMover9001 implements CrateMover {

    move (stacks: string[][], amountOfCrates: number, fromStack: number, toStack: number): void {
        const items = stacks[fromStack - 1].splice(0, amountOfCrates)
        stacks[toStack - 1].unshift(...items)
    }
}
