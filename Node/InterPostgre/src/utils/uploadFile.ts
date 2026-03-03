import fs from 'node:fs';
import path from 'node:path';
import createError from 'http-errors';
import httpStatus from 'http-status';

import { consoleLogger } from '../config/log.config.js';
import { generateRandomAlphabets } from './generateRandomAlphabets.js';

/**
 * Upload a base64 file to /src/public directory
 *
 * @param dir - target directory inside /public
 * @param data - base64 encoded file string
 * @param originalName - original file name (to extract extension)
 * @returns generated file name
 */
export const uploadFile = (
    dir: string,
    data: string,
    originalName: string
): string => {
    try {
        if (!dir || !data || !originalName) {
            throw createError(
                httpStatus.BAD_REQUEST,
                'Invalid upload parameters'
            );
        }

        const uploadDir = path.join(process.cwd(), 'src', 'public', dir);

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Extract file extension
        const imageType = originalName.split('.').pop();

        // Generate random filename
        const randomAlphabets = generateRandomAlphabets().toLowerCase();
        const fileName = `${Date.now()}_${randomAlphabets}.${imageType}`;

        const filePath = path.join(uploadDir, fileName);

        // Remove base64 prefix if present
        const base64Data = data.split('base64,').pop();

        // Write file
        fs.writeFileSync(filePath, base64Data as string, {
            encoding: 'base64'
        });

        return fileName;
    } catch (error) {
        const err = error as Error;
        consoleLogger.error('Upload file error', err);

        // IMPORTANT: throw so error middleware can handle it
        throw createError(
            httpStatus.INTERNAL_SERVER_ERROR,
            `Upload file error: ${err.message}`
        );
    }
};
