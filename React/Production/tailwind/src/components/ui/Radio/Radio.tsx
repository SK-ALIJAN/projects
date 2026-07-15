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
            {label && <label className="text-sm font-medium mb-2 text-gray-700">{label}</label>}
            <div className="flex flex-wrap gap-4">
                {options.map((opt) => (
                    <label key={opt.value} className="inline-flex items-center cursor-pointer select-none">
                        <input
                            type="radio"
                            name={name}
                            value={opt.value}
                            className={`w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer mr-2 ${error ? 'border-red-500' : ''} ${className}`}
                            {...props}
                        />
                        <span className="text-sm text-gray-900 font-medium">{opt.label}</span>
                    </label>
                ))}
            </div>
            {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
        </div>
    );
};

export default Radio;
