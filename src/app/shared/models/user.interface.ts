export interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    name: string;
    email: string;
    password: string;
    nuLogged: number;
    loggedAt: Date;
    nuRefreshed: number;
    refreshedAt: Date;
    activeAt: boolean;
    blockedAt: boolean;
}