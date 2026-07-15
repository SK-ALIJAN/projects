import React from 'react';
import styles from './empty-state.module.css';

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
        <div className={`${styles.container} ${className}`}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <h4 className={styles.title}>{title}</h4>
            {description && <p className={styles.description}>{description}</p>}
            {action && <div className={styles.action}>{action}</div>}
        </div>
    );
};

export default EmptyState;
