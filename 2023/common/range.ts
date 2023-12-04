/**
 * See https://stackoverflow.com/a/45355468/4997684
 */
export function range(start: number, end: number): number[] {
    return new Array(end - start).fill(0).map((d, i) => i + start);
}
