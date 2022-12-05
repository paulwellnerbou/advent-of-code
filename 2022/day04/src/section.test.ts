import { SectionRange } from "./section"

describe("Tests", () => {

    test("test find complete overlaps in assigned sections", () => {
        expect(new SectionRange(2, 4).containsCompletely(new SectionRange(2, 4))).toBeTruthy()
        expect(new SectionRange(2, 4).containsCompletely(new SectionRange(6, 8))).toBeFalsy()
        expect(new SectionRange(2, 8).containsCompletely(new SectionRange(3, 7))).toBeTruthy()
        expect(new SectionRange(3, 7).containsCompletely(new SectionRange(2, 8))).toBeFalsy()
    })

    test("test range creation", () => {
        expect(new SectionRange(5, 7).range()).toStrictEqual([5, 6, 7])
        expect(new SectionRange(5, 6).range()).toStrictEqual([5, 6])
        expect(new SectionRange(6, 6).range()).toStrictEqual([6])
        expect(new SectionRange(71, 75).range()).toStrictEqual([71,72,73,74,75])
    })
})
