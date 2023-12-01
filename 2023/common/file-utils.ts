import * as Bun from 'bun';

export async function sumAllLineResults(filePath: string, lineProcessor: (line: string) => number): Promise<number> {
    let sum = 0;
    await processFileLineByLine(filePath, line => sum += lineProcessor(line))
    return sum;
}

export async function collectProcessedLines<T>(filePath: string, lineProcessor: (line: string) => T): Promise<T[]> {
    const lines = [] as T[];
    await processFileLineByLine(filePath, line => lines.push(lineProcessor(line)))
    return lines;
}

export async function processFileLineByLine(filePath: string, lineProcessor: (line: string) => void) {
    const enc = new TextDecoder("utf-8")
    const stream = Bun.file(filePath).stream()
    
    let currentLine = ""

    for await (const chunk of stream) {
        let chunkString = enc.decode(chunk);
        while (chunkString.includes("\n")) {
            lineProcessor(currentLine += chunkString.substring(0, chunkString.indexOf("\n")))
            currentLine = ""
            chunkString = chunkString.substring(chunkString.indexOf("\n") + 1)
        }
        currentLine += chunkString
    }
    if(currentLine.length > 0) {
        lineProcessor(currentLine)
    }
}
