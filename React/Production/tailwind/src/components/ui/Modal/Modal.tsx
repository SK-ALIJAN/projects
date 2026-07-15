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
        sm: 'max-w-sm',
        md: 'max-w-xl',
        lg: 'max-w-3xl',
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1050] backdrop-blur-xs p-4" onClick={onClose}>
            <div
                className={`bg-white rounded-lg flex flex-col max-h-[90vh] w-full shadow-xl overflow-hidden scale-100 opacity-100 transition-all duration-200 animate-in fade-in zoom-in-95 ${sizeClasses[size]}`}
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="p-4 flex items-center justify-between border-b border-gray-100">
                    <h5 id="modal-title" className="m-0 text-lg font-semibold text-gray-900">{title}</h5>
                    <button className="bg-transparent border-none text-2xl cursor-pointer p-0 leading-none text-gray-400 hover:text-gray-600 focus:outline-none" onClick={onClose} aria-label="Close modal">
                        ×
                    </button>
                </div>
                <div className="p-4 overflow-y-auto flex-1">{children}</div>
                {footer && <div className="p-4 flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50/50">{footer}</div>}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
