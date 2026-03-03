import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../authSlice';
import type { RootState } from '../../../store/rootReducer';
import type { LoginPayload } from '../types';
import { ROUTES } from '../../../routes/routePaths';


export const useLogin = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const { isLoading, error, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
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
