export const environment = {
  production: true,
  name: "ChatWeb",
  description: "Description",
  version: "1.0.0",
  baseUrlApi: "http://localhost:8080",
  tokenWhitelistedDomains: [
    "http://localhost:8080"
  ],
  tokenBlacklistedRoutes: [
    "/api/token",
    "/api/user"
  ]
};