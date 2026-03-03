declare namespace AppError {
    type Code =
        | 'VALIDATION_ERROR'
        | 'AUTH_ERROR'
        | 'FORBIDDEN'
        | 'NOT_FOUND'
        | 'DATABASE_ERROR'
        | 'INTERNAL_ERROR';

    interface Error {
        code: Code;
        message: string;
        statusCode: number;
        isOperational: boolean;
        details?: any;
    }
}
