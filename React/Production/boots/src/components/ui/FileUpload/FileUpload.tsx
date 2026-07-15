import React, { useRef, useState } from 'react';
import styles from './file-upload.module.css';

interface FileUploadProps {
    onFileSelect: (files: FileList) => void;
    accept?: string;
    multiple?: boolean;
    maxSizeMb?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
    onFileSelect,
    accept,
    multiple = false,
    maxSizeMb = 10,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragActive(true);
        } else if (e.type === 'dragleave') {
            setIsDragActive(false);
        }
    };

    const validateFiles = (files: FileList): boolean => {
        const maxSize = maxSizeMb * 1024 * 1024;
        for (let i = 0; i < files.length; i++) {
            if (files[i].size > maxSize) {
                setError(`File size exceeds limit of ${maxSizeMb}MB.`);
                return false;
            }
        }
        setError(null);
        return true;
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            if (validateFiles(e.dataTransfer.files)) {
                onFileSelect(e.dataTransfer.files);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            if (validateFiles(e.target.files)) {
                onFileSelect(e.target.files);
            }
        }
    };

    const onButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={styles.container}>
            <div
                className={`${styles.dropZone} ${isDragActive ? styles.dragActive : ''} ${error ? styles.hasError : ''}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className={styles.fileInput}
                    multiple={multiple}
                    accept={accept}
                    onChange={handleChange}
                />
                <p className={styles.prompt}>Drag & drop your files here, or</p>
                <button type="button" className={styles.uploadBtn} onClick={onButtonClick}>
                    Browse Files
                </button>
                <p className={styles.limit}>Max file size: {maxSizeMb}MB</p>
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
        </div>
    );
};

export default FileUpload;
