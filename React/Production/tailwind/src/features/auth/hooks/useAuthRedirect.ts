import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../../store/rootReducer';
import { ROUTES } from '../../../routes/routePaths';
import { useSelector } from 'react-redux';

type Mode = 'protected' | 'guest';

export const useAuthRedirect = (mode: Mode) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if (mode === 'protected' && !isAuthenticated) {
            navigate(ROUTES.SIGN_IN);
        }

        if (mode === 'guest' && isAuthenticated) {
            navigate(ROUTES.HOME);
        }
    }, [mode, isAuthenticated, navigate]);
};

