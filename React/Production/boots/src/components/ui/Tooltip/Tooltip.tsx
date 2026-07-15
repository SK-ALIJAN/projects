import React, { useState } from 'react';
import styles from './tooltip.module.css';

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

    return (
        <div
            className={styles.container}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={`${styles.tooltip} ${styles[placement]}`}>
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
