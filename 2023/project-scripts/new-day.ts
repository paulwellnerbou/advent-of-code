import * as fs from "fs"
import path from "path"
import * as replace from "replace-in-file"
import { readdir, mkdir } from 'node:fs/promises';

const templateDirectory = path.join(import.meta.dir, ".templateForDay");

async function copyTemplateDirectory(day: number): Promise<void> {
    const dayStr = String(day).padStart(2, "0");
    const newDayDirectory = "day" + dayStr;

    await mkdir(newDayDirectory);

    (await readdir( templateDirectory )).forEach(async (f: string) => {
        const file = Bun.file(path.join(templateDirectory, f));
        await Bun.write(path.join(newDayDirectory, f), file);
    })

    const err = (e: Error | null) => { if (e) throw e }
    fs.rename(`${newDayDirectory}/day0X.test.ts`, `${newDayDirectory}/day${dayStr}.test.ts`, err)
    fs.rename(`${newDayDirectory}/day0X.ts`, `${newDayDirectory}/day${dayStr}.ts`, err)

    replace.sync({
        files: [`${newDayDirectory}/*`],
        from: /0X/g,
        to: dayStr
    })
}

function getNextDay(): number {
    return Math.max(...fs.readdirSync(".", { withFileTypes: true })
        .filter(item => item.isDirectory() && item.name.startsWith("day"))
        .map(d => +d.name.replace("day", "")))
}

const nextDay = getNextDay() + 1
copyTemplateDirectory(nextDay)
