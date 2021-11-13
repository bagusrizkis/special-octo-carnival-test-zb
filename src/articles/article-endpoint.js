import createArticle from "./article";
import createHttpError from '../helpers/http-error'
import sortParser from "../helpers/sort-parser";

export default function createArticleEndpointHandler({articleList}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case "POST":
                return postArticle(httpRequest)

            case "GET":
                return getArticles(httpRequest)

            case "PATCH":
                return modifyArticle(httpRequest)

            case "DELETE":
                return deleteArticle(httpRequest)

            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                })
        }
    }

    async function postArticle(httpRequest) {
        let articleData = httpRequest.body

        if (!articleData) {
            return createHttpError({
                statusCode: 400,
                errorMessage: "Bad Request. POST body is required"
            })
        }

        if (typeof httpRequest.body === 'string') {
            try {
                articleData = JSON.parse(articleData)
            } catch (error) {
                return createHttpError({
                    statusCode: 400,
                    errorMessage: "Bad Request. POST body must be valid JSON"
                })
            }
        }

        try {
            const article = createArticle(articleData)
            const result = await articleList.add(article)
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                // TODO normalize response
                data: JSON.stringify(result)
            }
        } catch (error) {
            return createHttpError({
                errorMessage: error.message,
                // TODO change statusCode by error type
                statusCode: 500
            })
        }
    }

    async function getArticles(httpRequest) {
        const { id } = httpRequest.pathParams || {}
        const { limit, page, sort, with_comment, filter} = httpRequest.queryParams || {}
        const parsedSort = sort ? sortParser(sort) : undefined
        const result = id
            ? await articleList.findById({articleId: id, with_comment})
            : await articleList.getArticles({limit, page, with_comment, sort: parsedSort, filter})
        
        // TODO move Response to json-response-creator
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify({
                meta: {
                    success: true,
                    total: result?.data?.length,
                    message: "Success Get Articles Data",
                    ...result?.info
                },
                data: {
                    articles: result?.data
                }
            })
        }
    }

    async function modifyArticle (httpRequest) {
        const { id } = httpRequest.pathParams || {}
        let articleData = httpRequest.body

        if (!id) {
            return createHttpError({
                statusCode: 400,
                errorMessage: "Bad Request. Required Id params"
            })
        }

        if (!articleData) {
            return createHttpError({
                statusCode: 400,
                errorMessage: "Bad Request. At least one data updates in post"
            })
        }

        if (typeof httpRequest.body === 'string') {
            try {
                articleData = JSON.parse(articleData)
            } catch (error) {
                return createHttpError({
                    statusCode: 400,
                    errorMessage: "Bad Request. POST body must be valid JSON"
                })
            }
        }

        try {
            const result = await articleList.update({articleId: id, ...articleData})
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                // TODO normalize response
                data: JSON.stringify(result)
            }
        } catch (error) {
            return createHttpError({
                errorMessage: error.message,
                // TODO change statusCode by error type
                statusCode: 500
            })
        }
    }

    async function deleteArticle (httpRequest) {
        const { id } = httpRequest.pathParams || {}

        try {
            const result = await articleList.destroy({articleId: id})
            // TODO make more informational response
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                data: JSON.stringify(result)
            }
        } catch (error) {
            return createHttpError({
                errorMessage: error.message,
                // TODO change statusCode by error type
                statusCode: 500
            })
        }
    }
}