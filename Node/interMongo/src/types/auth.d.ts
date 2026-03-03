declare namespace Auth {
    type Role = 'ADMIN' | 'USER' | 'MODERATOR';

    interface User {
        id: string | number;
        email: string;
        role: Role;
    }

    interface JwtPayload {
        userId: string | number;
        role: Role;
        iat?: number;
        exp?: number;
    }

    interface LoginBody {
        email: string;
        pass: string;
    }
}
