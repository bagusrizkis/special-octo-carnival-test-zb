import requiredParam from "../helpers/requred-params";
import isValidEmail from "../helpers/is-valid-email";
import { InvalidPropertyError } from "../helpers/errors";

export default function createArticle (
    articleData = requiredParam('articleData')
) {
    const validArticle = validate(articleData);
    const normalArticle = normalize(validArticle)
    return Object.freeze(normalArticle)

    function validate({
        authorEmail = requiredParam('author'),
        createdAt = new Date(),
        title = requiredParam('title'),
        content = requiredParam("content"),
        ...rest
    } = {}) {
        validateEmail(authorEmail)
        validateDate(createdAt)
        return {authorEmail, title, createdAt, content, ...rest}
    }

    function validateEmail (emailAddress) {
        if (!isValidEmail(emailAddress)) {
          throw new InvalidPropertyError('Invalid author email address.')
        }
    }

    function validateDate (date) {
        const isValidDate = Date.parse(date)
        if (isNaN(isValidDate)) {
            throw new InvalidPropertyError('Invalid createdAt.')
        }
    }

    function normalize({ authorEmail, title, createdAt, content, ...rest }) {
        return {
            authorEmail: authorEmail.toLowerCase(),
            createdAt, title, content,
            ...rest,
        }
    }
}