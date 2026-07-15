import React, { useRef, useState } from 'react';

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
        <div className="flex flex-col w-full">
            <div
                className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-gray-50/50 text-center transition-all duration-200 ${isDragActive ? 'border-blue-500 bg-blue-50/15' : 'border-gray-300'} ${error ? 'border-red-500 bg-red-50/10' : ''}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    multiple={multiple}
                    accept={accept}
                    onChange={handleChange}
                />
                <p className="text-sm text-gray-500 m-0 mb-3">Drag & drop your files here, or</p>
                <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors cursor-pointer border-none focus:outline-none"
                    onClick={onButtonClick}
                >
                    Browse Files
                </button>
                <p className="text-xs text-gray-400 m-0 mt-3">Max file size: {maxSizeMb}MB</p>
            </div>
            {error && <p className="text-red-500 text-xs mt-2 m-0">{error}</p>}
        </div>
    );
};

export default FileUpload;
