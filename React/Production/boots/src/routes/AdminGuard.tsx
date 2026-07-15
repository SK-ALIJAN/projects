import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './routePaths';
import { useAppSelector } from '../store/store';

const AdminGuard = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.SIGN_IN} replace />;
    }

    if (user?.role !== 'admin') {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
};

export default AdminGuard;
