import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary' }) => {
    const variants = {
        primary: 'bg-blue-50 text-blue-700',
        success: 'bg-green-50 text-green-700',
        warning: 'bg-amber-50 text-amber-700',
        danger: 'bg-red-50 text-red-700',
        info: 'bg-sky-50 text-sky-700',
    };

    return (
        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full capitalize leading-none ${variants[variant]}`}>
            {children}
        </span>
    );
};

export default Badge;
