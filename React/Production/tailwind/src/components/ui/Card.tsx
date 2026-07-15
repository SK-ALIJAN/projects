import React from 'react';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    footer?: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({
    children,
    title,
    description,
    footer,
    className = '',
}) => {
    return (
        <div className={`bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col overflow-hidden w-full ${className}`}>
            {(title || description) && (
                <div className="px-6 py-5 border-b border-gray-50">
                    {title && <h3 className="text-base font-semibold text-gray-900">{title}</h3>}
                    {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
                </div>
            )}
            <div className="p-6 flex-1 text-gray-600">{children}</div>
            {footer && <div className="px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/50">{footer}</div>}
        </div>
    );
};

export default Card;
