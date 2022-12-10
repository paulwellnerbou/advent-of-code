export class Device {
    cycle = 0
    x = 1
    accumulatedSignalStrengthSum = 0

    crt = ""

    private drawPixel (): void {
        const positionToDraw = this.cycle - 1
        if (this.spritePosition() - 1 <= (positionToDraw % 40) && this.spritePosition() + 1 >= (positionToDraw % 40)) {
            this.crt = this.crt + "#"
        } else {
            this.crt = this.crt + "."
        }
        if (this.cycle % 40 === 0) {
            this.crt = this.crt + "\n"
        }
    }

    private spritePosition () {
        if (this.x < 1) return 1
        if (this.x > 39) return 39
        return this.x
    }

    render (): string {
        return this.crt
    }

    execute (command: string): void {
        this.nextCycle()
        if (command.startsWith("addx")) {
            this.nextCycle()
            this.x += +command.split(" ")[1]
        }
    }

    private analyzeSignal () {
        if (this.cycle == 20 || ((this.cycle - 20)) % 40 === 0) {
            this.accumulatedSignalStrengthSum += this.signalStrength()
        }
    }

    private signalStrength (): number {
        return this.cycle * this.x
    }

    private nextCycle () {
        this.cycle++
        this.analyzeSignal()
        this.drawPixel()
    }
}
