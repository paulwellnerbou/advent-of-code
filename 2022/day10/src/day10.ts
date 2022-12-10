import { readInputFileSplitBy } from "../../common/file-utils"
import { Device } from "./Device"

export class Day10 {

    calculateAccumulatedSignalStrengthSum(fileName: string): number {
        const device = new Device()
        readInputFileSplitBy(fileName).forEach(line =>
            device.execute(line)
        )
        return device.accumulatedSignalStrengthSum
    }

    drawCrtAndRenderScreen(fileName: string): string {
        const device = new Device()
        readInputFileSplitBy(fileName).forEach(line =>
            device.execute(line)
        )
        return device.render()
    }
}
