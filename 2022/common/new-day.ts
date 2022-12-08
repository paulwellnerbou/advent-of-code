import * as fs from "fs-extra"
import * as replace from "replace-in-file"

const template = ".templateForDay";

function copyTemplateDirectory(day: number) {
    const dayStr = String(day).padStart(2, "0")
    const newDayDirectory = "day" + dayStr
    if (fs.existsSync(newDayDirectory)) {
        throw Error(`Directory ${newDayDirectory} exists already.`)
    }

    fs.copySync(template, newDayDirectory, { overwrite: false })
    const err = (e: Error | null) => { if (e) throw e }
    fs.rename(`${newDayDirectory}/src/day0X.test.ts`, `${newDayDirectory}/src/day${dayStr}.test.ts`, err)
    fs.rename(`${newDayDirectory}/src/day0X.ts`, `${newDayDirectory}/src/day${dayStr}.ts`, err)

    replace.sync({
        files: [`${newDayDirectory}/src/*`],
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
