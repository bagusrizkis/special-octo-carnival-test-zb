import mongodb from 'mongodb'
import { DB_NAME, DB_URL } from '../helpers/constants'

export default async function createDB ({url, dbName} = {url: DB_URL, dbName: DB_NAME}) {
    const MongoClient = mongodb.MongoClient
    
    const client = new MongoClient(url, { useNewUrlParser: true })
    await client.connect()
    const db = await client.db(dbName)

    db.makeId = makeIdFromString

    return db
}

function makeIdFromString (id) {
    return new mongodb.ObjectID(id)
}
