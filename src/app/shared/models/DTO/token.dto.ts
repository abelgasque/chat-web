export interface TokenDTO {
    access_token: string;
    refresh_token: string;
    data: {
        name: string;
        email: string;
    }
}