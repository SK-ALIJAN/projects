import React from 'react';

interface SkeletonProps {
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
    variant = 'rectangular',
    width,
    height,
    className = '',
}) => {
    const variantClasses = {
        text: 'w-full h-3 rounded mb-2',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };

    return (
        <span
            className={`inline-block bg-gray-200 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] animate-pulse ${variantClasses[variant]} ${className}`}
            style={{ width, height }}
        />
    );
};

export default Skeleton;
