import { useAppDispatch, useAppSelector } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/features/auth';
import type { LoginPayload } from '@/features/auth';
import { ROUTES } from '@/routes/routePaths';


export const useLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isLoading, error, isAuthenticated } = useAppSelector(
        (state) => state.auth
    );

    const handleLogin = async (values: LoginPayload) => {
        const result = await dispatch(loginUser(values));

        if (loginUser.fulfilled.match(result)) {
            navigate(ROUTES.HOME);
        }
    };

    return {
        handleLogin,
        isLoading,
        error,
        isAuthenticated,
    };
};
