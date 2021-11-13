import createComent from "./comment";

export default function createCommentList ({ database  }) {
    return Object.freeze({
        getArticleComments,
        add,
        update,
        destroy
    })

    async function getArticleComments ({articleId: article_id}) {
        const db = await database
        article_id = db.makeId(article_id)

        return (
            await db.collection('comments')
                    .find({ article_id })
                    .toArray()
        ).map(documentToComments)
    }

    async function add ({commentId, article_id, ...comment}) {
        const db = await database
        
        if (commentId) {
            comment._db = db.makeId(commentId)
        }

        if (article_id) {
            comment.article_id = db.makeId(article_id)
        }

        const {acknowledged, insertedId} = await db
            .collection('comments')
            .insertOne(comment)
            .catch(mongoError => {
                throw mongoError
            })

        return {
            success: acknowledged,
            created: { _id: insertedId }
        }
    }

    async function update ({commentId, ...comment}) {
        const db = await database
        if (commentId) {
            comment._id = db.makeId(commentId)
        }

        const result = await db
            .collection('comments')
            .updateOne({_id: comment._id}, { $set: {...comment} })
            .catch(mongoError => {
                throw mongoError
            })

        return result
    }

    async function destroy ({commentId, ...comment}) {
        const db = await database
        if (commentId) {
            comment._id = db.makeId(commentId)
        }
    
        const result = await db
            .collection('comments')
            .deleteMany(comment)

        return result
    }

    function documentToComments ({ _id: commentId, ...doc }) {
        return createComent({ commentId, ...doc })
    }
}