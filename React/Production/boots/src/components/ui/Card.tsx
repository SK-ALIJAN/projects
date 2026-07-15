import React from 'react';
import styles from './card.module.css';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    footer?: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({
    children,
    title,
    description,
    footer,
    className = '',
}) => {
    return (
        <div className={`${styles.card} ${className}`}>
            {(title || description) && (
                <div className={styles.header}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    {description && <p className={styles.description}>{description}</p>}
                </div>
            )}
            <div className={styles.content}>{children}</div>
            {footer && <div className={styles.footer}>{footer}</div>}
        </div>
    );
};

export default Card;
