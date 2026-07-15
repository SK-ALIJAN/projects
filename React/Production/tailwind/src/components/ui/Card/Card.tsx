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
        <div className={`bg-white rounded-lg border border-gray-200 shadow-xs flex flex-col overflow-hidden w-full ${className}`}>
            {(title || description) && (
                <div className="px-5 pt-5">
                    {title && <h3 className="text-lg font-semibold text-gray-900 m-0">{title}</h3>}
                    {description && <p className="text-sm text-gray-500 m-0 mt-1">{description}</p>}
                </div>
            )}
            <div className="p-5 flex-1">{children}</div>
            {footer && <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-2">{footer}</div>}
        </div>
    );
};

export default Card;
