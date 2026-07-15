import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

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

    const placementClasses = {
        left: 'left-0 h-full',
        right: 'right-0 h-full',
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-40 flex bg-black/40 backdrop-blur-[1px]" onClick={onClose}>
            <div
                className={`fixed top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden transform transition-transform duration-300 ${placementClasses[placement]}`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                    {title && <h5 className="text-base font-semibold text-gray-900">{title}</h5>}
                    <button className="text-gray-400 hover:text-gray-600 text-2xl font-light focus:outline-none" onClick={onClose} aria-label="Close drawer">
                        ×
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1 text-gray-600">{children}</div>
            </div>
        </div>,
        document.body
    );
};

export default Drawer;
