import { readInputFileSplitBy } from "../../common/file-utils"
const TEST_INPUT_FILE = __dirname + "/../input-test.txt"

export function printDay11Part2() {
    const day = new Day11()
    day.parseMonkeyFromFile(TEST_INPUT_FILE)
    day.rounds(20, (n: number) => n)
    console.log("Part 2: monkey item inspections", day.monkeyInspectsItems)
    console.log("Part 2: monkey business", day.monkeyBusiness())
}

class Monkey {
    itemsWorryLevel: number[] = []
    operation: (n: number) => number = (n) => n
    divisibleBy = 0
    throwTo: (n: number) => number = (n) => n
}

export class Day11 {

    monkeys: Monkey[] = []
    monkeyInspectsItems: number[] = []
    productOfAllMonkeyDivisables = 1

    monkeyBusiness(): number {
        return this.monkeyInspectsItems
            .sort((a, b) => b - a)
            .slice(0, 2)
            .reduce((previousValue, currentValue) => previousValue * currentValue)
    }

    rounds(noOfRounds: number, worryHandler: (n: number) => number): void {
        for (let i = 0; i < noOfRounds; i++) {
            this.nextRound(worryHandler)
        }
    }

    nextRound (worryHandler: (n: number) => number): void {
        this.monkeys.forEach((monkey, index) => {
            monkey.itemsWorryLevel.forEach(itemWorryLevel => {
                this.monkeyInspectsItems[index] ++
                this.checkSafety(itemWorryLevel)
                const newItemWorryLevel = Math.floor(worryHandler(monkey.operation(itemWorryLevel)))
                this.monkeys[monkey.throwTo(newItemWorryLevel)].itemsWorryLevel.push(newItemWorryLevel)
            })
            monkey.itemsWorryLevel = []
        })
    }

    parseMonkey (lines: string[]): Monkey {
        const monkey = new Monkey()
        lines.forEach((line, index, array) => {
            const args = this.readCommandArgsFromLine(line)
            if (line.trim().startsWith("Starting items: ")) {
                monkey.itemsWorryLevel.push(...args.split(",").map(n => +n.trim()))
            }
            if (line.trim().startsWith("Operation: ")) {
                const operationArgs = args.replace("new = old", "").trim().split(" ")
                monkey.operation = this.getOperationByString(operationArgs)
            }
            if (line.trim().startsWith("Test: ")) {
                monkey.divisibleBy = +args.replace("divisible by ", "").trim()
                monkey.throwTo = this.parseThrow(monkey.divisibleBy, array[index + 1], array[index + 2])
            }
        })
        return monkey
    }

    private parseThrow (divisibleBy: number, trueString: string, falseString: string) {
        return (n: number) => n % divisibleBy == 0 ? this.getNumberOutOfString(trueString) : this.getNumberOutOfString(falseString)
    }

    private getNumberOutOfString (str: string): number {
        return +str.replace(/\D/g, "")
    }

    private readCommandArgsFromLine (line: string): string {
        return line.trim().split(":")[1]
    }

    readMonkeys (lines: string[]): void {
        this.monkeys.push(...lines.map(str => this.parseMonkey(str.split("\n"))))
        this.monkeyInspectsItems.push(...this.monkeys.map((v) => 0))
        this.productOfAllMonkeyDivisables = this.monkeys.map(m => m.divisibleBy).reduce((a, b) => a * b)
    }

    parseMonkeyFromFile (fileName: string) {
        this.readMonkeys(readInputFileSplitBy(fileName, "\n\n"))
    }

    private getOperationByString (operationArgs: string[]): (n: number) => number {
        return (n: number) => {
            const numberToCalculateWith: number = operationArgs[1] == "old" ? n : +operationArgs[1]
            switch (operationArgs[0]) {
            case "*":
                return n * numberToCalculateWith
            case "+":
                return n + numberToCalculateWith
            case "-":
                return n - numberToCalculateWith
            default:
                throw Error("Unknown operation type: " + operationArgs.join(" "))
            }
        }
    }

    private checkSafety (n: number) {
        if(!Number.isSafeInteger(n)) {
            throw new Error(`${n} is no safe integer!`)
        }
    }
}
