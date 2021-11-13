import createDB from "../db"
import createCommentList from "./comment-list"
import createCommentEndpointHandler from "./comment-endpoint"

const database = createDB()
const commentList = createCommentList({ database })
const commentEndpointHandler = createCommentEndpointHandler({ commentList })

export default commentEndpointHandler
