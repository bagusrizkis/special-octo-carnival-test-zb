import createArticle from "./article";

export default function createArticleList ({ database  }) {
    return Object.freeze({
        getArticles,
        findById,
        add,
        update,
        destroy
    })

    async function getArticles ({limit, page, with_comment, sort, filter}) {
        const db = await database
        const aggregate = []
        const info = {}
        const filterRegex = new RegExp(filter, 'gi')
        if (filter) {
            aggregate.push({ 
                $match:{ $or: [{content: {"$regex": filterRegex}},{title: {"$regex": filterRegex}}]}
            })
            info.filter = filter
        }
        if (with_comment === 'true') {
            aggregate.push({ $lookup: { from: "comments", foreignField: "article_id", localField: "_id", as: "comments" }}) 
            info.with_comment = with_comment
        }
        if (sort) {
            aggregate.push({$sort: {[sort.field]: sort.order}})
            info.sort = sort
        }
        if (limit & page) {
            const skipped = (Number(page) - 1 ) * Number(limit)
            aggregate.push({$skip: skipped})
            info.page = page
        }
        if (limit) {
            aggregate.push({$limit: Number(limit)})
            info.limit = limit
        }

        return {
            info,
            data: (await db.collection('articles').aggregate(aggregate).toArray()).map(documentToArticles)
        }
    }

    async function findById ({ articleId, with_comment }) {
        const db = await database
        const info = {}
        const aggregate = [{ $match: { _id: db.makeId(articleId) }}]
        if (with_comment !== "false") {
            info.with_comment = with_comment
            aggregate.push({ $lookup: { from: "comments", foreignField: "article_id", localField: "_id", as: "comments" }})
        }
        const found = await db
            .collection('articles')
            .aggregate(aggregate)
            .toArray()

        if (found) return {
            info,
            data: found
        }
        return {}
    }

    async function add ({articleId, ...article}) {
        const db = await database

        if (articleId) {
            article._db = db.makeId(articleId)
        }

        const {acknowledged, insertedId} = await db
            .collection('articles')
            .insertOne(article)
            .catch(mongoError => {
                throw mongoError
            })

        return {
            success: acknowledged,
            created: { articleId: insertedId }
        }
    }

    async function update ({articleId, ...article}) {
        const db = await database
        if (articleId) {
            article._id = db.makeId(articleId)
        }

        const result = await db
            .collection('articles')
            .updateOne({_id: article._id}, { $set: {...article} })
            .catch(mongoError => {
                throw mongoError
            })
        
        return result
    }

    async function destroy ({articleId, ...article}) {
        const db = await database
        if (articleId) {
            article._id = db.makeId(articleId)
        }
    
        const result = await db
            .collection('articles')
            .deleteMany(article)

        return result
    }

    function documentToArticles ({ _id: articleId, ...doc }) {
        return createArticle({ articleId, ...doc })
    }
}

