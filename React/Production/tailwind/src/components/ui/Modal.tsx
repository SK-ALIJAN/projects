import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

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

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-3xl',
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
            <div
                className={`bg-white rounded-lg shadow-xl flex flex-col w-full max-h-[90vh] overflow-hidden transform transition-all scale-100 ${sizeClasses[size]}`}
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                    <h5 id="modal-title" className="text-lg font-semibold text-gray-900">{title}</h5>
                    <button className="text-gray-400 hover:text-gray-600 text-2xl font-light focus:outline-none" onClick={onClose} aria-label="Close modal">
                        ×
                    </button>
                </div>
                <div className="px-6 py-4 overflow-y-auto flex-1 text-gray-600">{children}</div>
                {footer && <div className="px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50">{footer}</div>}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
