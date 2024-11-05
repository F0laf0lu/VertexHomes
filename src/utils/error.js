export class CustomError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode
    }
}

export class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404); 
    }
}

export class BadRequestError extends CustomError {
    constructor(message) {
        super(message, 400)
    }
}

export class UnauthorizedError extends CustomError{
    constructor(message){
        super(message,  401)
    }
}

export class PermissionDeniedError extends CustomError{
    constructor(message){
        super(message, 403)
    }
}