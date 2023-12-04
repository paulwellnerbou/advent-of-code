import * as Bun from 'bun';

export async function sumAllLineResults(filePath: string, lineProcessor: (line: string, index: number) => number): Promise<number> {
    let sum = 0;
    await processFileLineByLine(filePath, (line, index) => sum += lineProcessor(line, index))
    return sum;
}

export async function collectProcessedLines<T>(filePath: string, lineProcessor: (line: string) => T): Promise<T[]> {
    const lines = [] as T[];
    await processFileLineByLine(filePath, line => lines.push(lineProcessor(line)))
    return lines;
}

export async function processFileLineByLine(filePath: string, lineProcessor: (line: string, index: number) => void) {
    const enc = new TextDecoder("utf-8")
    const stream = Bun.file(filePath).stream()
    
    let currentLine = ""
    let currentLineIndex = 0

    for await (const chunk of stream) {
        let chunkString = enc.decode(chunk);
        while (chunkString.includes("\n")) {
            lineProcessor(currentLine += chunkString.substring(0, chunkString.indexOf("\n")), currentLineIndex++)
            currentLine = ""
            chunkString = chunkString.substring(chunkString.indexOf("\n") + 1)
        }
        currentLine += chunkString
    }
    if(currentLine.length > 0) {
        lineProcessor(currentLine, currentLineIndex++)
    }
}
