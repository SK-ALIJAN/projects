export interface GlobalErrorPayload {
    status?: number;
    message?: string;
    [key: string]: unknown;
}

type ErrorSetter = (error: GlobalErrorPayload | null) => void;

let setErrorRef: ErrorSetter | null = null;

export const registerGlobalErrorSetter = (setter: ErrorSetter) => {
    setErrorRef = setter;
};

export const globalErrorService = {
    show: (error: GlobalErrorPayload) => {
        if (setErrorRef) {
            setErrorRef(error);
        }
    },
    clear: () => {
        if (setErrorRef) {
            setErrorRef(null);
        }
    },
};
