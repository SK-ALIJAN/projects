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
        left: 'left-0 animate-in slide-in-from-left duration-250',
        right: 'right-0 animate-in slide-in-from-right duration-250',
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black/40 z-[1040] flex backdrop-blur-xs" onClick={onClose}>
            <div
                className={`absolute top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl flex flex-col overflow-hidden ${placementClasses[placement]}`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
                    {title && <h5 className="m-0 text-base font-semibold text-gray-900">{title}</h5>}
                    <button className="bg-transparent border-none text-2xl cursor-pointer p-0 leading-none text-gray-400 hover:text-gray-600 focus:outline-none" onClick={onClose} aria-label="Close drawer">
                        ×
                    </button>
                </div>
                <div className="p-5 overflow-y-auto flex-1">{children}</div>
            </div>
        </div>,
        document.body
    );
};

export default Drawer;
