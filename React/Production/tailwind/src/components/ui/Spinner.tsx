import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'light';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', variant = 'primary' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-7 h-7 border-[3px]',
        lg: 'w-12 h-12 border-4',
    };

    const variantClasses = {
        primary: 'border-blue-600/10 border-t-blue-600',
        secondary: 'border-gray-600/10 border-t-gray-600',
        light: 'border-white/10 border-t-white',
    };

    return (
        <span className={`inline-block rounded-full animate-spin ${sizeClasses[size]} ${variantClasses[variant]}`} />
    );
};

export default Spinner;
