import React from 'react';
import styles from './avatar.module.css';

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
    return (
        <div className={`${styles.avatar} ${styles[size]}`}>
            {src ? (
                <img src={src} alt={alt || 'avatar'} className={styles.image} />
            ) : (
                <span className={styles.fallback}>{fallback.substring(0, 2).toUpperCase()}</span>
            )}
        </div>
    );
};

export default Avatar;
