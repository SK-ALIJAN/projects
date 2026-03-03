declare namespace Pagination {
    interface Params {
        page?: number;
        limit?: number;
        search?: string;
    }

    interface Result<T> {
        docs: T[];
        totalDocs: number;
        limit: number;
        totalPages: number;
        page: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    }
}
