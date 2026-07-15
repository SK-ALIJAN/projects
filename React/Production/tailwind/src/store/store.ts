import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { rootReducer } from './rootReducer';
import type { RootState } from './rootReducer';
import { loggerMiddleware } from './middleware';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(loggerMiddleware),
    devTools: import.meta.env.DEV,
});

// Types
export type AppDispatch = typeof store.dispatch;

// Custom Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
