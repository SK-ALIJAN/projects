import React from 'react';
import styles from './spinner.module.css';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'light';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', variant = 'primary' }) => {
    return (
        <span className={`${styles.spinner} ${styles[size]} ${styles[variant]}`} />
    );
};

export default Spinner;
