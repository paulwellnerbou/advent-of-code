export function sum (numbers: number[]): number {
    return numbers.reduce((accumulator, current) => {
        return accumulator + current
    }, 0)
}

export function range (start: number, end: number): number[] {
    return Array.from({ length: (end + 1 - start) }, (v, k) => k + start)
}

export function group (elements: string[], groupSize = 3): string[][] {
    const groups: string[][] = []
    let group: string[] = []
    elements.forEach((value, index) => {
        group.push(value)
        if (index % groupSize === groupSize - 1) {
            groups.push(group)
            group = []
        }
    })
    return groups
}
