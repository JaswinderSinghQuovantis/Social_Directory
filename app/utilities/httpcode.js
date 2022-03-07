
class HttpCode {
    responseCode = {
        Conflit: 409,
        OK: 200,
        Created: 201,
        Unprocessable_Entity: 422,
        Bad_Request: 400,
        Unauthorized: 401,
        Not_Found: 404,
        InternalServerError:500
    }
}
export default new HttpCode;