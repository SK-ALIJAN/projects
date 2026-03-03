import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: Auth.User;
            pagination?: Pagination.Params;
            requestId?: string;
        }
    }
}

export { };
