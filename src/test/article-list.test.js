import createDB from '../db/index'
import createArticleList from '../articles/article-list'
import { createFakeArticle } from './util/fake-data'
import { DB_NAME_TEST, DB_URL_TEST } from '../helpers/constants'

const database = createDB({dbName: DB_NAME_TEST, url: DB_URL_TEST})
const articleList = createArticleList({ database })

describe('Article Repository', () => {
    beforeAll(() => articleList.destroy({}))

    it("add new article", async () => {
        const dummyArticle = createFakeArticle()
        const result = await articleList.add(dummyArticle)
        expect(result.success).toBe(true)
        expect(result.created).toHaveProperty('articleId')
        const currentArticle = {...dummyArticle, articleId: result.created.articleId}
        return articleList.destroy(currentArticle)
    })

    /**
     * ! This is just skeleton code for the next test
     *   TODO =================================================
     * - Test failed create
     * - Test update success and failed
     * - Test destroy success and failed
     * - Test read with page, filter, sort, with_comment, limit
     */
})