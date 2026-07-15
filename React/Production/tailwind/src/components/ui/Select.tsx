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
                <label className="text-sm font-medium text-gray-600 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <select
                className={`px-3 py-2 border rounded-md text-sm text-gray-800 bg-white outline-none cursor-pointer transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 appearance-none bg-[url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")] bg-[position:right_12px_center] bg-no-repeat bg-[size:20px] pr-9 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
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
