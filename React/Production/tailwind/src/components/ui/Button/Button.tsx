import React, { memo } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-blue-700',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-gray-600',
    danger: 'bg-danger text-danger-foreground hover:bg-red-700',
    outline: 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground',
};

const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4.5 py-2.5 text-base',
    lg: 'px-5.5 py-3.5 text-lg',
};

const Button = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    children,
    disabled,
    ...rest
}: ButtonProps) => {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border-none cursor-pointer',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            disabled={disabled || isLoading}
            {...rest}
        >
            {isLoading ? (
                <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            ) : (
                children
            )}
        </button>
    );
};

export default memo(Button);
