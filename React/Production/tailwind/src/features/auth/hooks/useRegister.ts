import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../authSlice';
import type { RegisterPayload } from '../types';
import { ROUTES } from '../../../routes/routePaths';


export const useRegister = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isLoading, error } = useAppSelector(
        (state) => state.auth
    );

    const handleRegister = async (values: RegisterPayload) => {
        const result = await dispatch(registerUser(values));

        if (registerUser.fulfilled.match(result)) {
            navigate(ROUTES.SIGN_IN);
        }
    };

    return {
        handleRegister,
        isLoading,
        error,
    };
};
