import requiredParam from "../helpers/requred-params";
import isValidEmail from "../helpers/is-valid-email";
import { InvalidPropertyError } from "../helpers/errors";

export default function createComent (
    comentData = requiredParam('commentData')
) {
    const validComment = validate(comentData);
    const normalComment = normalize(validComment)
    return Object.freeze(normalComment)

    function validate({
        article_id = requiredParam('article_id'),
        email = requiredParam('author'),
        content = requiredParam("content"),
        ...rest
    } = {}) {
        validateEmail(email)
        return {email, article_id, content, ...rest}
    }

    function validateEmail (emailAddress) {
        if (!isValidEmail(emailAddress)) {
          throw new InvalidPropertyError('Invalid commentator email address.')
        }
    }

    function normalize({ email, article_id, content, ...rest }) {
        return {
            ...rest,
            article_id,
            email: email.toLowerCase(),
            content
        }
    }
}