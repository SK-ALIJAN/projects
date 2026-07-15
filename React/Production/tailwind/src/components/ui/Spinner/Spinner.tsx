import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'light';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', variant = 'primary' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-7 h-7 border-3',
        lg: 'w-12 h-12 border-4',
    };

    const variantClasses = {
        primary: 'border-t-blue-600',
        secondary: 'border-t-gray-600',
        light: 'border-t-white',
    };

    return (
        <span className={`inline-block border-black/10 rounded-full animate-spin ${sizeClasses[size]} ${variantClasses[variant]}`} />
    );
};

export default Spinner;
