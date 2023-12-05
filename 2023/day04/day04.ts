import { processFileLineByLine, sumAllLineResults } from "../common/file-utils"
import { range } from "../common/range"

interface Card {
    id: number,
    winning: number[]
    have: number[]
    instances: number
}

export const part2 = async (fileName: string): Promise<number> => {
    // This should be possible without having to save all cards in a map, too
    const cards = new Map<number, Card>()
    await processFileLineByLine(fileName, (line, index) => {
        const card = parseLine(line)
        return cards.set(card.id, card)
    })
    processCardsPart2(cards)
    let sum = 0
    cards.forEach(card => {
        sum += card.instances
    })
    return sum
}

export const processCardsPart2 = (cards: Map<number, Card>) => {
    cards.forEach(card => {
        winMoreCards(card, (cardId: number) => {
            if(cards.get(cardId)) {
                cards.get(cardId)!.instances += card.instances
            }
            return 1
        })
    })
}

export const winMoreCards = (card: Card, newCardWonCallback: (cardId: number) => number) => {
    return range(card.id + 1, card.id + 1 + amountOfWinningNumbers(card)).forEach(id => {
        newCardWonCallback(id)
    })
}

export const parseLine = (line: string): Card => {
    const [card, numbers] = line.split(': ')
    const [winningNumbers, haveNumbers] = numbers.split(' | ')
    return {
        id: parseInt(card.replace('Card ', '')),
        winning: winningNumbers.split(' ').map(n => n.trim()).filter(n => n).map(n => parseInt(n)),
        have: haveNumbers.split(' ').map(n => n.trim()).filter(n => n).map(n => parseInt(n)),
        instances: 1
    }
}

export const amountOfWinningNumbers = (card: Card): number => {
    return card.have.filter(n => card.winning.includes(n)).length
}

export const processLinePart1 = (line: string): number => {
    const winningNumbers = amountOfWinningNumbers(parseLine(line))
    return winningNumbers > 0 ? Math.pow(2, winningNumbers - 1) : 0
}

export const printDay04 = async (): Promise<void> => {
    console.log("========== Day 04 ==========")
    console.log("Part 1: ", await day04part1())
    console.log("Part 2: ", await day04part2())
}

export const day04part1 = async (): Promise<number> => {
    return sumAllLineResults(import.meta.dir + "/input.txt", (line) => processLinePart1(line))
}

export const day04part2 = async (): Promise<number> => {
    return part2(import.meta.dir + "/input.txt")
}
