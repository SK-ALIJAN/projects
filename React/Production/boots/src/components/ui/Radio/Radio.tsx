import React from 'react';
import styles from './radio.module.css';

interface RadioOption {
    label: string;
    value: string | number;
}

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    options: RadioOption[];
    error?: string;
}

const Radio: React.FC<RadioProps> = ({
    label,
    options,
    error,
    name,
    className = '',
    ...props
}) => {
    return (
        <div className={styles.container}>
            {label && <label className={styles.groupLabel}>{label}</label>}
            <div className={styles.group}>
                {options.map((opt) => (
                    <label key={opt.value} className={styles.label}>
                        <input
                            type="radio"
                            name={name}
                            value={opt.value}
                            className={`${styles.radio} ${error ? styles.error : ''} ${className}`}
                            {...props}
                        />
                        <span className={styles.labelText}>{opt.label}</span>
                    </label>
                ))}
            </div>
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default Radio;
