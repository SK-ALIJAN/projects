import React, { memo } from 'react';
import { cn } from '@/utils/cn';

type InputTypes =
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'date'
    | 'time'
    | 'file'
    | 'search'
    | 'tel'
    | 'url';

interface BaseProps {
    label?: string;
    error?: string;
    required?: boolean;
    className?: string;
    containerClass?: string;
}

interface InputProps
    extends BaseProps,
    React.InputHTMLAttributes<HTMLInputElement> {
    type?: InputTypes;
    as?: 'input';
}

interface TextareaProps
    extends BaseProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    as: 'textarea';
}

interface SelectProps
    extends BaseProps,
    React.SelectHTMLAttributes<HTMLSelectElement> {
    as: 'select';
    options: { label: string; value: string }[];
}

type Props = InputProps | TextareaProps | SelectProps;

const Input = (props: Props) => {
    const {
        label,
        error,
        required,
        className = '',
        containerClass = '',
    } = props;

    const baseInputClass = cn(
        'px-3 py-2.5 border rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-1 bg-white',
        error
            ? 'border-danger focus:border-danger focus:ring-danger'
            : 'border-gray-300 focus:border-primary focus:ring-primary',
        className
    );

    const renderField = () => {
        if (props.as === 'textarea') {
            const { as, label, error, required, containerClass, ...textareaProps } = props;
            return (
                <textarea
                    {...textareaProps}
                    className={baseInputClass}
                />
            );
        }

        if (props.as === 'select') {
            const { as, label, error, required, containerClass, options, ...selectProps } = props;
            return (
                <select
                    {...selectProps}
                    className={baseInputClass}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            );
        }

        const { as, label, error, required, containerClass, ...inputProps } = props as InputProps;
        return (
            <input
                {...inputProps}
                className={baseInputClass}
            />
        );
    };

    return (
        <div className={cn('flex flex-col', containerClass)}>
            {label && (
                <label className="mb-1.5 text-sm font-medium text-gray-900 text-start">
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}

            {renderField()}

            {error && <span className="text-danger text-xs mt-1 text-start">{error}</span>}
        </div>
    );
};

export default memo(Input);
