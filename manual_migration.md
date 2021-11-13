# Migration MongoDB

# Intro

This guide is for manual migration via [mongosh](https://docs.mongodb.com/mongodb-shell/install/#std-label-mdb-shell-install)

1. Connect to DB
```sh
mongosh "mongodb+srv://cluster0.6kcoq.mongodb.net/test_be" --username user
```
you will be promted a password, for this case just enter `user` for password.
or you can use your own database

2. use database name
```js
use test_be
```

3. import articles data
```js
db.articles.insertMany([
    {
        "_id": ObjectId("618fcbb6ca41cbae1d334a1e"),
        "createdAt": "2021-09-13T14:39:34.701Z",
        "authorEmail": "test1@mail.com",
        "title": "Golang 101",
        "content": "#Intro\nTLDR...\n\nThank you..."
    },
    {
        "_id": ObjectId("618fcbb6ca41cbae1d334a1f"),
        "createdAt": "2021-10-14T14:39:34.701Z",
        "authorEmail": "test2@mail.com",
        "title": "Nodejs 101",
        "content": "#Intro\nTLDR...\n\nThank you..."
    },
    {
        "_id": ObjectId("618fcbb6ca41cbae1d334a20"),
        "createdAt": "2021-10-16T14:39:34.701Z",
        "authorEmail": "test3@mail.com",
        "title": "Rust from zero to mastery",
        "content": "#Intro\nTLDR...\n\nThank you..."
    },
    {
        "_id": ObjectId("618fcbb6ca41cbae1d334a21"),
        "createdAt": "2021-11-02T14:39:34.701Z",
        "authorEmail": "test3@mail.com",
        "title": "Rust from zero to mastery",
        "content": "#Intro\nTLDR...\n\nThank you..."
    },
    {
        "_id": ObjectId("618fcbb6ca41cbae1d334a22"),
        "createdAt": "2021-11-07T14:39:34.701Z",
        "authorEmail": "test1@mail.com",
        "title": "Nodejs + Express + Mongodb",
        "content": "#Intro\nTLDR...\n\nThank you..."
    },
    {
        "_id": ObjectId("618fcbb6ca41cbae1d334a23"),
        "createdAt": "2021-11-13T14:39:34.701Z",
        "authorEmail": "test1@mail.com",
        "title": "Golang for Javascript developer",
        "content": "#Intro\nTLDR...\n\nThank you..."
    }
])
```

4. import comments data
```js
db.comments.insertMany([
    {
        "article_id": ObjectId("618fcbb6ca41cbae1d334a1e"),
        "email": "test3@mail.com",
        "content": "I Love Go"
    },
    {
        "article_id": ObjectId("618fcbb6ca41cbae1d334a1e"),
        "email": "test3@mail.com",
        "content": "Very Useful"
    },
    {
        "article_id": ObjectId("618fcbb6ca41cbae1d334a1f"),
        "email": "test1@mail.com",
        "content": "Good Article 👍"
    },
    {
        "article_id": ObjectId("618fcbb6ca41cbae1d334a23"),
        "email": "test3@mail.com",
        "content": "Vary clear and stright to the point. Love this..."
    },
    {
        "article_id": ObjectId("618fcbb6ca41cbae1d334a23"),
        "email": "test2@mail.com",
        "content": "Wowww, love this article"
    },
])
```

5. set index for articles
```js
db.articles.createIndex({"content":1})
db.articles.createIndex({"title":1})
```

6. setup environtment in .env
```sh
DB_URL=your_url_here
DB_NAME=test_be
```