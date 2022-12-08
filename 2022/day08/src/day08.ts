import { readInputFileSplitBy } from "../../common/file-utils"
import { Forest } from "./Forest"

const INPUT_FILE = __dirname + "/../input.txt"

export class Day08 {
    private forest: Forest

    constructor (fileName: string) {
        this.forest = new Forest(readInputFileSplitBy(fileName))
    }

    countAllVisibleTrees (): number {
        return this.forest.countVisibleTrees()
    }

    detectTreeWithBestScenicView () {
        return this.forest.detectTreeWithBestScenicView()
    }
}
