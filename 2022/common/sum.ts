export function sum (numbers: number[]): number {
    return numbers.reduce((accumulator, current) => {
        return accumulator + current
    }, 0)
}
