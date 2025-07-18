export interface TokenDTO {
    accessToken: string;
    // refreshToken: string;
    data: {
        username: string;
        email: string;
    }
}