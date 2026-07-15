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
                    className={`w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer mr-2 ${error ? 'border-red-500' : ''} ${className}`}
                    {...props}
                />
                {label && <span className="text-sm text-gray-900 font-medium">{label}</span>}
            </label>
            {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
        </div>
    );
};

export default Checkbox;
