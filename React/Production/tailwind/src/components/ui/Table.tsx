import React from 'react';

interface TableProps {
    headers: string[];
    children: React.ReactNode;
    className?: string;
}

const Table: React.FC<TableProps> = ({ headers, children, className = '' }) => {
    return (
        <div className="w-full overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm">
            <table className={`w-full border-collapse text-left text-sm text-gray-600 ${className}`}>
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i} className="px-6 py-3 font-semibold text-gray-900 text-xs uppercase tracking-wider">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {children}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
