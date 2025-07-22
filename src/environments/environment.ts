export const environment = {
  production: true,
  name: "ChatWeb",
  description: "Description",
  version: "1.0.0",
  baseUrlApi: "http://localhost:8080",
  baseUrlMiddleware: "http://localhost:8081",
  supersetConfig: {
    url: "http://localhost:8088",
    adminId: "819810c9-c9e3-4a3f-817f-54622d4fae10"
  },
  tokenWhitelistedDomains: [
    "http://localhost:8080"
  ],
  tokenBlacklistedRoutes: [
    "/api/token",
    "/api/user"
  ]
};