import sortParser from '../sort-parser'

describe("Test helpers", () => {
    it("Should parse sort query", () => {
        const sortQuery = "createdAt.dec"
        const parsed = sortParser(sortQuery)
        expect(parsed).toMatchObject({
            field: "createdAt",
            order: -1
        })
    })

    /**
     * ! This is just skeleton code for the next test
     *   TODO =================================
     * - Test error
     * - Test validate email
     * - Test required Params
     * - Test HTTP Error and Error
     * - Test constant
     */
})