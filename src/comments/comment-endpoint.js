import createHttpError from '../helpers/http-error'
import createComent from "./comment";

export default function createArticleEndpointHandler({commentList}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case "POST":
                return addComment(httpRequest)
            
            case "GET":
                return getCommentByArticle(httpRequest)
            
            case "PATCH":
                return modifyComment(httpRequest)

            case "DELETE":
                return deleteComment(httpRequest)

            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                })
        }
    }

    async function addComment(httpRequest) {
        let commentData = httpRequest.body
        let { articleId: article_id } = httpRequest.pathParams

        if (!commentData) {
            return createHttpError({
                statusCode: 400,
                errorMessage: "Bad Request. POST body is required"
            })
        }

        if (typeof httpRequest.body === 'string') {
            try {
                commentData = JSON.parse(commentData)
            } catch (error) {
                return createHttpError({
                    statusCode: 400,
                    errorMessage: "Bad Request. POST body must be valid JSON"
                })
            }
        }

        try {
            const comment = createComent({ article_id ,...commentData })
            const result = await commentList.add(comment)
            // TODO normalize response
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
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

    async function getCommentByArticle(httpRequest) {
        const { articleId } = httpRequest.pathParams || {}

        const result = await commentList.getArticleComments({ articleId })

        // TODO normalize response
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify(result)
        }
    }

    async function modifyComment (httpRequest) {
        const { id } = httpRequest.pathParams || {}
        let commentData = httpRequest.body

        if (!id) {
            return createHttpError({
                statusCode: 400,
                errorMessage: "Bad Request. Required Id params"
            })
        }

        if (!commentData) {
            return createHttpError({
                statusCode: 400,
                errorMessage: "Bad Request. At least one data updates in post"
            })
        }

        if (typeof httpRequest.body === 'string') {
            try {
                commentData = JSON.parse(commentData)
            } catch (error) {
                return createHttpError({
                    statusCode: 400,
                    errorMessage: "Bad Request. POST body must be valid JSON"
                })
            }
        }

        try {
            const result = await commentList.update({commentId: id, ...commentData})
            // TODO normalize response
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

    async function deleteComment (httpRequest) {
        const { id } = httpRequest.pathParams || {}

        try {
            const result = await commentList.destroy({commentId: id})
            // TODO normalize response
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