import { z } from 'zod';

const envSchema = z.object({
    VITE_PUBLIC_API_URL: z.string().url('VITE_PUBLIC_API_URL must be a valid URL inside your .env file'),
    VITE_GOOGLE_MAPS_API_KEY: z.string().min(1, 'VITE_GOOGLE_MAPS_API_KEY is required inside your .env file'),
    MODE: z.string().min(1),
});

const envParsedResult = envSchema.safeParse({
    VITE_PUBLIC_API_URL: import.meta.env.VITE_PUBLIC_API_URL,
    VITE_GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    MODE: import.meta.env.MODE,
});

if (!envParsedResult.success) {
    console.error('❌ Environment configuration validation failed:');
    console.error(JSON.stringify(envParsedResult.error.format(), null, 2));
    throw new Error('Configuration validation failure. Please check your active .env file.');
}

const envParsed = envParsedResult.data;

export const config = {
    env: envParsed.MODE,
    apiUrl: envParsed.VITE_PUBLIC_API_URL,
    googleMapsApiKey: envParsed.VITE_GOOGLE_MAPS_API_KEY,
    isDev: envParsed.MODE === 'development',
    isProd: envParsed.MODE === 'production',
    isStaging: envParsed.MODE === 'staging',
    auth: {
        tokenKey: 'auth_access_token',
        refreshTokenKey: 'auth_refresh_token',
        rememberMeKey: 'auth_remember_me',
    },
    apiTimeout: envParsed.MODE === 'production' ? 20000 : 15000,
} as const;

export type Config = typeof config;
export default config;
