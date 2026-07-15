import { useState, useCallback, useMemo } from 'react';

interface PaginationConfig {
    initialPage?: number;
    initialLimit?: number;
}

export const usePagination = (config?: PaginationConfig) => {
    const [page, setPage] = useState<number>(config?.initialPage || 1);
    const [limit, setLimit] = useState<number>(config?.initialLimit || 10);
    const [totalItems, setTotalItems] = useState<number>(0);

    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(totalItems / limit));
    }, [totalItems, limit]);

    const handlePageChange = useCallback((newPage: number) => {
        setPage(Math.max(1, Math.min(newPage, totalPages)));
    }, [totalPages]);

    const handleLimitChange = useCallback((newLimit: number) => {
        setLimit(newLimit);
        setPage(1); 
    }, []);

    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
        page,
        limit,
        totalItems,
        totalPages,
        setTotalItems,
        setPage,
        setLimit,
        handlePageChange,
        handleLimitChange,
        hasNextPage,
        hasPreviousPage,
    };
};
