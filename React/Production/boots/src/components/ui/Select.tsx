import React from 'react';
import styles from './select.module.css';

interface SelectOption {
    label: string;
    value: string | number;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOption[];
    error?: string;
    required?: boolean;
}

const Select: React.FC<SelectProps> = ({
    label,
    options,
    error,
    required,
    className = '',
    ...props
}) => {
    return (
        <div className={styles.container}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <select
                className={`${styles.select} ${error ? styles.error : ''} ${className}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default Select;
