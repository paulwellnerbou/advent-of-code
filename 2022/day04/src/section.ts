import { range } from "../../common/utils"

export class SectionRange {
    start: number
    end: number

    constructor(...startEnd: number[]) {
        this.start = startEnd[0]
        this.end = startEnd[1]
    }

    containsAtLeastOneSectionOf(anotherSectionRange: SectionRange): boolean {
        return this.contains(anotherSectionRange.start) || this.contains(anotherSectionRange.end)
    }

    private contains(section: number): boolean {
        return this.start <= section && this.end >= section
    }

    containsCompletely(anotherSection: SectionRange): boolean {
        return this.start <= anotherSection.start && this.end >= anotherSection.end
    }

    range(): number[] {
        return range(this.start, this.end)
    }
}
