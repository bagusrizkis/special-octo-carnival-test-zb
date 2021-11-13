import faker from 'faker'
import createArticle from "../../articles/article"
export function createFakeArticle() {
    return createArticle({
        createdAt: faker.date.past(),
        authorEmail: faker.internet.email(),
        title: faker.lorem.word(),
        content: faker.lorem.paragraphs()
    })
}
