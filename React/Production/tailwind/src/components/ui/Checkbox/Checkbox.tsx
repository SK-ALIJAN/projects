import React from 'react';
import { cn } from '@/utils/cn';

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
                    className={cn(
                        'w-4 h-4 rounded text-primary border-gray-300 focus:ring-primary cursor-pointer me-2',
                        error && 'border-danger',
                        className
                    )}
                    {...props}
                />
                {label && <span className="text-sm text-gray-900 font-medium">{label}</span>}
            </label>
            {error && <span className="text-danger text-xs mt-1 text-start">{error}</span>}
        </div>
    );
};

export default Checkbox;
