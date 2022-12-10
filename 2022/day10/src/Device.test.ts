import { Device } from "./Device"
import { readInputFileSplitBy } from "../../common/file-utils"

describe("Test Device", () => {

    const TEST_INPUT_FILE = __dirname + "/../input-test.txt"

    test("Executing test file", () => {
        const device = new Device()

        readInputFileSplitBy(TEST_INPUT_FILE).forEach(line =>
            device.execute(line)
        )

        expect(device.accumulatedSignalStrengthSum).toBe(13140)
    })

    test("Executing instructions manually", () => {
        const device = new Device()
        device.execute("noop")
        device.execute("addx 3")
        device.execute("addx -5")
    })
})
