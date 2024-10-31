class CustomError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode
    }
}

class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404); 
    }
}

class BadRequestError extends CustomError {
    constructor(message) {
        super(message, 400)
    }
}
 
export {CustomError, BadRequestError, NotFoundError}