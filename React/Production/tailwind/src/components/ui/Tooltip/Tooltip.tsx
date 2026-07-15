import React, { useState } from 'react';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({
    content,
    children,
    placement = 'top',
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const placementClasses = {
        top: 'bottom-full left-50 -translate-x-50 -translate-y-2 mb-2',
        bottom: 'top-full left-50 -translate-x-50 translate-y-2 mt-2',
        left: 'right-full top-50 -translate-y-50 -translate-x-2 mr-2',
        right: 'left-full top-50 -translate-y-50 translate-x-2 ml-2',
    };

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={`absolute bg-gray-800 text-white px-2.5 py-1.5 rounded text-xs whitespace-nowrap z-[1070] shadow-md pointer-events-none ${placementClasses[placement]}`}>
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
