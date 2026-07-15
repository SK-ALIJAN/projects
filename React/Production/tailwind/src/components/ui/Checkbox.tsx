import React from 'react';

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
        <div className="flex flex-col mb-3">
            <label className="inline-flex items-center cursor-pointer select-none">
                <input
                    type="checkbox"
                    className={`w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2 focus:ring-offset-0 cursor-pointer ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                    {...props}
                />
                {label && <span className="ml-2 text-sm font-medium text-gray-700">{label}</span>}
            </label>
            {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
        </div>
    );
};

export default Checkbox;
