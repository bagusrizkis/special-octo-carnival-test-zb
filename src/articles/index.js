import createDB from "../db"
import createArticleEndpointHandler from "./article-endpoint"
import createContactList from "./article-list"

const database = createDB()
const articleList = createContactList({ database })
const articleEndpointHandler = createArticleEndpointHandler({articleList})

export default articleEndpointHandler