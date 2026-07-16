import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
// import AdminLayout from '@/layouts/AdminLayout';

// import AdminGuard from './AdminGuard';
import GuestGuard from './GuestGuard';
import { ROUTES } from './routePaths';
import { NotFound } from '@/features/404';

// Lazy load pages from barrel files using path mappings
const Home = lazy(() => import('@/features/home').then(module => ({ default: module.Home })));
const Login = lazy(() => import('@/features/auth').then(module => ({ default: module.Login })));
const Register = lazy(() => import('@/features/auth').then(module => ({ default: module.Register })));
const Unauthorized = lazy(() => import('@/features/auth').then(module => ({ default: module.Unauthorized })));


const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>

                {/* Public */}
                <Route element={<MainLayout />}>
                    <Route path={ROUTES.HOME} element={<Home />} />
                    <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
                </Route>

                {/* Guest */}
                <Route element={<GuestGuard />}>
                    <Route element={<AuthLayout />}>
                        <Route path={ROUTES.SIGN_IN} element={<Login />} />
                        <Route path={ROUTES.SIGN_UP} element={<Register />} />
                    </Route>
                </Route>

                {/* Authenticated */}
                {/* <Route element={<AuthGuard />}>
                    <Route element={<MainLayout />}>
                        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    </Route>
                </Route> */}

                {/* Admin */}
                {/* <Route element={<AdminGuard />}>
                    <Route element={<AdminLayout />}>
                        <Route path={ROUTES.ADMIN} element={<AdminPanel />} />
                    </Route>
                </Route> */}

                {/* 404 */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
