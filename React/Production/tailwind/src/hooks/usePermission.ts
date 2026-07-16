import { useAppSelector } from '@/store/store';

export const usePermission = () => {
    const { user } = useAppSelector((state) => state.auth);

    const hasPermission = (permission: string): boolean => {
        if (!user) return false;
        if (user.role === 'admin') return true;
        
        const permissions: string[] = (user as any).permissions || [];
        return permissions.includes(permission);
    };

    const hasAnyPermission = (requiredPermissions: string[]): boolean => {
        return requiredPermissions.some((perm) => hasPermission(perm));
    };

    const hasAllPermissions = (requiredPermissions: string[]): boolean => {
        return requiredPermissions.every((perm) => hasPermission(perm));
    };

    return {
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
    };
};
