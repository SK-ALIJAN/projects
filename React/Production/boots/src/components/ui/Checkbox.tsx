import React from 'react';
import styles from './checkbox.module.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
    label,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className={styles.container}>
            <label className={styles.label}>
                <input
                    type="checkbox"
                    className={`${styles.checkbox} ${error ? styles.error : ''} ${className}`}
                    {...props}
                />
                {label && <span className={styles.labelText}>{label}</span>}
            </label>
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default Checkbox;
