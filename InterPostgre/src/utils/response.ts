import type { Response } from 'express';

/* ================= SUCCESS RESPONSE ================= */

export interface SuccessResponseOptions<T = unknown> {
    message?: string;
    data?: T;
    statusCode?: number;
}

export const successResponse = <T>(
    res: Response,
    options: SuccessResponseOptions<T> = {}
): Response => {
    const {
        message = 'Success',
        data = null,
        statusCode = 200
    } = options;

    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

/* ================= ERROR RESPONSE ================= */

export interface ErrorResponseOptions {
    message?: string;
    statusCode?: number;
    errors?: unknown;
}

export const errorResponse = (
    res: Response,
    options: ErrorResponseOptions = {}
): Response => {
    const {
        message = 'Something went wrong',
        statusCode = 500,
        errors = null
    } = options;

    return res.status(statusCode).json({
        success: false,
        message,
        errors
    });
};
