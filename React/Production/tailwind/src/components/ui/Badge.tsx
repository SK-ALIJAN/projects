import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary' }) => {
    const variantClasses = {
        primary: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10',
        success: 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20',
        warning: 'bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/20',
        danger: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10',
        info: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/20',
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClasses[variant]}`}>
            {children}
        </span>
    );
};

export default Badge;
