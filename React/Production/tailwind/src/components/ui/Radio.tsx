import React from 'react';

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
        <div className="flex flex-col mb-4">
            {label && <label className="text-sm font-medium text-gray-600 mb-2">{label}</label>}
            <div className="flex flex-wrap gap-4">
                {options.map((opt) => (
                    <label key={opt.value} className="inline-flex items-center cursor-pointer select-none">
                        <input
                            type="radio"
                            name={name}
                            value={opt.value}
                            className={`w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2 focus:ring-offset-0 cursor-pointer ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                            {...props}
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">{opt.label}</span>
                    </label>
                ))}
            </div>
            {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
        </div>
    );
};

export default Radio;
