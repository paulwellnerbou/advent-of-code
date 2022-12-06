import "./string"

export class Day06 {
    findStartOfMessageMarker(input: string): number {
        return this.findSubstringWithDistinctChars(input, 14)
    }

    findStartOfPacketMarker(input: string) : number {
        return this.findSubstringWithDistinctChars(input, 4)
    }

    findSubstringWithDistinctChars(input: string, amountOfDistinctChars: number) : number {
        const inputArray = input.split("")
        for (let index = 0; index < inputArray.length; index++) {
            const lastNChars = input.substring(index-amountOfDistinctChars, index)
            if (index >= amountOfDistinctChars && (lastNChars == lastNChars.distinct())) {
                return index
            }
        }

        throw new Error(`No start-of-packet marker with ${amountOfDistinctChars} distinct chars found in stream ${input}`)
    }
}
