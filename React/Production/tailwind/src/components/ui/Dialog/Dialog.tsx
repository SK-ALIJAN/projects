import React from 'react';
import Modal from '@/components/ui/Modal/Modal';
import Button from '@/components/ui/Button/Button';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    isConfirmLoading?: boolean;
}

const Dialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    isConfirmLoading = false,
}) => {
    const footer = (
        <>
            <Button variant="secondary" onClick={onClose} disabled={isConfirmLoading}>
                {cancelLabel}
            </Button>
            <Button variant="primary" onClick={onConfirm} isLoading={isConfirmLoading}>
                {confirmLabel}
            </Button>
        </>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer} size="sm">
            <p className="m-0 text-sm text-gray-500">{message}</p>
        </Modal>
    );
};

export default Dialog;
