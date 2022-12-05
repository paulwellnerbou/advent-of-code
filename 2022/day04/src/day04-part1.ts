import { readInputFileSplitBy } from "../../common/file-utils"
import { SectionRange } from "./section"

export class Day04 {

    countAnyOverlaps(fileName: string): number {
        return this.countOverlaps(fileName, (s1, s2) => this.anyOverlap(s2, s1))
    }

    countOverlappingAssignmentPairs(fileName: string): number {
        return this.countOverlaps(fileName, (s1, s2) => this.isCompleteOverlap(s1, s2))
    }

    private countOverlaps (fileName: string, overlapDetectionFunction: (section1Str: string, section2Str: string) => boolean) {
        return readInputFileSplitBy(fileName).map(line => {
            const split = line.split(",")
            return overlapDetectionFunction(split[0], split[1])
        }).filter(val => val).length
    }

    anyOverlap(section1Str: string, section2Str: string): boolean {
        const sectionRange = this.parseSection(section1Str)
        const anotherSectionRange = this.parseSection(section2Str)
        return sectionRange.containsAtLeastOneSectionOf(anotherSectionRange) || anotherSectionRange.containsAtLeastOneSectionOf(sectionRange)
    }

    isCompleteOverlap(section1Str: string, section2Str: string): boolean {
        const section1 = this.parseSection(section1Str)
        const section2 = this.parseSection(section2Str)

        return section1.containsCompletely(section2) || section2.containsCompletely(section1)
    }

    private parseSection(assignedSectionsInput: string): SectionRange {
        return new SectionRange(...assignedSectionsInput.split("-").map(str => +str))
    }
}
