import React from 'react';

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
        <div className="flex flex-col mb-4 w-full">
            {label && (
                <label className="text-sm font-medium mb-1.5 text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <select
                className={`px-3 py-2 rounded-lg border bg-white text-gray-900 text-sm outline-none transition-all focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 cursor-pointer appearance-none ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
        </div>
    );
};

export default Select;
