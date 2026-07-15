import React from 'react';
import styles from './table.module.css';

interface TableProps {
    headers: string[];
    children: React.ReactNode;
    className?: string;
}

const Table: React.FC<TableProps> = ({ headers, children, className = '' }) => {
    return (
        <div className={styles.tableWrapper}>
            <table className={`${styles.table} ${className}`}>
                <thead className={styles.thead}>
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i} className={styles.th}>
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styles.tbody}>{children}</tbody>
            </table>
        </div>
    );
};

export default Table;
