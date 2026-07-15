import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import { ROUTES } from '../../../routes/routePaths';

type Mode = 'protected' | 'guest';

export const useAuthRedirect = (mode: Mode) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector(
        (state) => state.auth
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

