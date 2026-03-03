import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../authSlice';
import type { RootState } from '../../../store/rootReducer';
import type { RegisterPayload } from '../types';
import { ROUTES } from '../../../routes/routePaths';


export const useRegister = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const { isLoading, error } = useSelector(
        (state: RootState) => state.auth
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
