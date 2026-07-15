import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './drawer.module.css';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    placement?: 'left' | 'right';
}

const Drawer: React.FC<DrawerProps> = ({
    isOpen,
    onClose,
    title,
    children,
    placement = 'right',
}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={`${styles.drawer} ${styles[placement]}`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <div className={styles.header}>
                    {title && <h5 className={styles.title}>{title}</h5>}
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close drawer">
                        ×
                    </button>
                </div>
                <div className={styles.content}>{children}</div>
            </div>
        </div>,
        document.body
    );
};

export default Drawer;
