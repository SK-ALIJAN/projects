import jwt, { JwtPayload } from 'jsonwebtoken';
import createError from 'http-errors';
import httpStatus from 'http-status';

import config from '../config/index.js';
import { consoleLogger } from '../config/log.config.js';

/**
 * Generate JWT token
 */
export const genToken = async (
    payload: string | object | Buffer,
    exp: string = `${config.jwtExpirationDays} days`
): Promise<string> => {
    try {
        return jwt.sign(payload, config.jwtSecret, {
            expiresIn: exp
        });
    } catch (error) {
        const err = error as Error;
        consoleLogger.error('JWT generation failed', err);
        throw createError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
};

/**
 * Verify JWT token
 */
export const verifyToken = async <T = JwtPayload>(
    token: string
): Promise<T> => {
    try {
        return jwt.verify(token, config.jwtSecret) as T;
    } catch (error) {
        throw createError(
            httpStatus.UNAUTHORIZED,
            'Authentication failed'
        );
    }
};
