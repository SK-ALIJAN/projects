import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="flex flex-wrap list-none p-0 m-0">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className="inline-flex items-center text-sm">
                            {!isLast && item.path ? (
                                <Link to={item.path} className="text-blue-600 hover:underline font-medium text-decoration-none">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-gray-500 font-normal" aria-current="page">
                                    {item.label}
                                </span>
                            )}
                            {!isLast && <span className="mx-2 text-gray-400 select-none">/</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
