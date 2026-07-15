import React from 'react';

interface AvatarProps {
    src?: string;
    alt?: string;
    fallback: string;
    size?: 'sm' | 'md' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({
    src,
    alt,
    fallback,
    size = 'md',
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-14 h-14 text-lg',
    };

    return (
        <div className={`inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-200 text-gray-700 font-semibold select-none ${sizeClasses[size]}`}>
            {src ? (
                <img src={src} alt={alt || 'avatar'} className="w-full h-full object-cover" />
            ) : (
                <span className="flex items-center justify-center w-full h-full">{fallback.substring(0, 2).toUpperCase()}</span>
            )}
        </div>
    );
};

export default Avatar;
