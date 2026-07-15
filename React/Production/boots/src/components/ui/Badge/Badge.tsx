import React from 'react';
import styles from './badge.module.css';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary' }) => {
    return (
        <span className={`${styles.badge} ${styles[variant]}`}>
            {children}
        </span>
    );
};

export default Badge;
