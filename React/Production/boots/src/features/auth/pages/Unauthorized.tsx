import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            padding: '24px',
            backgroundColor: '#f9fafb',
            color: '#1f2937',
        }}>
            <h1 style={{ fontSize: '4rem', margin: '0 0 16px 0', color: '#dc2626' }}>403</h1>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 8px 0' }}>Access Denied</h2>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 24px 0', maxWidth: '400px' }}>
                You do not have the required permissions to access this page. Please contact your system administrator.
            </p>
            <button
                onClick={() => navigate('/')}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 500,
                }}
            >
                Back to Home
            </button>
        </div>
    );
};

export default Unauthorized;
