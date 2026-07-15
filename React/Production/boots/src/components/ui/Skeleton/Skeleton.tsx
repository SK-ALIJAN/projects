import React from 'react';
import styles from './skeleton.module.css';

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
    return (
        <span
            className={`${styles.skeleton} ${styles[variant]} ${className}`}
            style={{ width, height }}
        />
    );
};

export default Skeleton;
