import handle from '../articles'

describe("Article Endpoint", () => {
    it ("Success Create a new article", async () => {
        const result = await handle({
            method: "POST",
            body  : JSON.stringify({
                title: "asdasd",
                authorEmail: "test@mail.com",
                content: "asdasd"
            })
        })

        expect(result).toHaveProperty("headers")
        expect(result).toHaveProperty("data")
    })

    /**
     * ! This is just skeleton code for the next test
     */
})