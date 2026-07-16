import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';
import { useAppSelector } from '@/store/store';

const GuestGuard = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    if (isAuthenticated) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
};

export default GuestGuard;
