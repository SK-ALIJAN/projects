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
        <div className={`flex flex-col items-center justify-center p-12 text-center border border-dashed border-gray-300 rounded-lg bg-gray-50/50 w-full ${className}`}>
            {icon && <div className="text-gray-400 mb-4 text-4xl">{icon}</div>}
            <h4 className="text-base font-semibold text-gray-900 mb-1">{title}</h4>
            {description && <p className="text-sm text-gray-500 mb-5 max-w-sm">{description}</p>}
            {action && <div className="flex justify-center">{action}</div>}
        </div>
    );
};

export default EmptyState;
