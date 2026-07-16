import { useAppDispatch, useAppSelector } from '@/store/store';
import { logout } from '@/features/auth';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, isAuthenticated, isLoading, error } = useAppSelector(
        (state) => state.auth
    );

    const handleLogout = () => {
        dispatch(logout());
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        logout: handleLogout,
        isAdmin: user?.role === 'admin',
    };
};
