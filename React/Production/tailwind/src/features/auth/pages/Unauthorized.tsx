import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gray-50 text-gray-800">
            <h1 className="text-7xl font-extrabold text-red-600 mb-4">403</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-sm text-gray-500 mb-6 max-w-sm">
                You do not have the required permissions to access this page. Please contact your system administrator.
            </p>
            <button
                onClick={() => navigate('/')}
                className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-lg shadow-sm transition-colors cursor-pointer border-none focus:outline-none"
            >
                Back to Home
            </button>
        </div>
    );
};

export default Unauthorized;
