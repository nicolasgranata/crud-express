import {Request, Response, NextFunction } from 'express';

class AppCustomError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
    
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: AppCustomError, _request: Request, response: Response, _next: NextFunction) => {
    response.header('Content-Type', 'application/json');
    const status = error.statusCode || 400;
    response.status(status).send(error.message);
};

export default errorHandler;