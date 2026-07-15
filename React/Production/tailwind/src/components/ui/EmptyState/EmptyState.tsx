import React from 'react';

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    icon,
    action,
    className = '',
}) => {
    return (
        <div className={`flex flex-col items-center justify-center p-12 text-center border border-dashed border-gray-200 rounded-lg bg-gray-50/50 w-full ${className}`}>
            {icon && <div className="text-4xl text-gray-400 mb-4">{icon}</div>}
            <h4 className="text-lg font-semibold text-gray-900 m-0 mb-2">{title}</h4>
            {description && <p className="text-sm text-gray-500 m-0 mb-5 max-w-sm">{description}</p>}
            {action && <div className="flex justify-center">{action}</div>}
        </div>
    );
};

export default EmptyState;
