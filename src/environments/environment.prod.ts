export const environment = {
  "production": true,
  "name": "ChatWeb",
  "description": "Description",
  "version": "1.0.0",
  "baseUrlApi": "https://chat-api-q5y8.onrender.com",
  "baseUrlWs": "wss://chat-middleware.onrender.com",
  "supersetConfig": {
    "url": "https://superset-hbx2.onrender.com",
    "adminId": "819810c9-c9e3-4a3f-817f-54622d4fae10"
  },
  "tokenWhitelistedDomains": [
    "https://chat-api-q5y8.onrender.com"
  ],
  "tokenBlacklistedRoutes": [
    "/api/token",
    "/api/user"
  ]
};