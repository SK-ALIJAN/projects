import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 1) return null;

    return (
        <nav className="flex items-center justify-center gap-1 mt-4 w-full" aria-label="Pagination">
            <button
                className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &laquo;
            </button>
            {pages.map((p) => (
                <button
                    key={p}
                    className={`border rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${p === currentPage ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => onPageChange(p)}
                >
                    {p}
                </button>
            ))}
            <button
                className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &raquo;
            </button>
        </nav>
    );
};

export default Pagination;
