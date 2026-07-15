import React from 'react';
import styles from './pagination.module.css';

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
        <nav className={styles.pagination} aria-label="Pagination">
            <button
                className={styles.pageBtn}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &laquo;
            </button>
            {pages.map((p) => (
                <button
                    key={p}
                    className={`${styles.pageBtn} ${p === currentPage ? styles.active : ''}`}
                    onClick={() => onPageChange(p)}
                >
                    {p}
                </button>
            ))}
            <button
                className={styles.pageBtn}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &raquo;
            </button>
        </nav>
    );
};

export default Pagination;
