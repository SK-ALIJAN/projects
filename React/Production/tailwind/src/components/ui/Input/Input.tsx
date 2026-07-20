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

const omitBaseProps = <T extends Record<string, unknown>>(obj: T) => {
    const copy = { ...obj };
    delete copy.label;
    delete copy.error;
    delete copy.required;
    delete copy.containerClass;
    delete copy.as;
    return copy;
};

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
            const textareaProps = omitBaseProps(props as unknown as Record<string, unknown>);
            return (
                <textarea
                    {...(textareaProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    className={baseInputClass}
                />
            );
        }

        if (props.as === 'select') {
            const { options, ...rest } = props;
            const selectProps = omitBaseProps(rest as unknown as Record<string, unknown>);
            return (
                <select
                    {...(selectProps as React.SelectHTMLAttributes<HTMLSelectElement>)}
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

        const inputProps = omitBaseProps(props as unknown as Record<string, unknown>);
        return (
            <input
                {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
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
