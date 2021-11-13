import express from 'express'

import requestData from "../helpers/request-data.js";
import articleEndpointHandler from "../articles";
import commentEndpointHandler from "../comments/index.js";

import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const router = express.Router()

router.get('/articles/:id*?', articlesController)
router.post('/articles', articlesController)
router.patch('/articles/:id', articlesController)
router.delete('/articles/:id', articlesController)

router.get("/comments/:articleId", commentsController)
router.post("/comments/:articleId", commentsController)
router.patch("/comments/:id", commentsController)
router.delete("/comments/:id", commentsController)

function articlesController (req, res) {
    const httpRequest = requestData(req)
    articleEndpointHandler(httpRequest)
      .then(({ headers, statusCode, data }) =>
        res
          .set(headers)
          .status(statusCode)
          .send(data)
      )
      .catch(e => res.status(500).end())
}

function commentsController  (req, res) {
    const httpRequest = requestData(req)
    commentEndpointHandler(httpRequest)
        .then(({ headers, statusCode, data }) =>
            res
            .set(headers)
            .status(statusCode)
            .send(data)
        )
        .catch(e => res.status(500).end())
}

app.use('/v1/', router)
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
