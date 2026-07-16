import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';
import { useAppSelector } from '@/store/store';

const AuthGuard = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.SIGN_IN} state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default AuthGuard;
