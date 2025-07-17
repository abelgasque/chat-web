require('dotenv').config();
require('./build-packege');

const fs = require('fs');
const path = require('path');

const {
  BASE_URL_API,
  APP_NAME,
  APP_DESCRIPTION,
  APP_VERSION,
  SUPERSET_BASE_URL,
  SUPERSET_EMBED_ADMIN_ID,
} = process.env;

try {
  const environmentVariables = {
    production: true,
    name: APP_NAME,
    description: APP_DESCRIPTION,
    version: APP_VERSION,
    baseUrlApi: BASE_URL_API,
    supersetConfig: {
      url: SUPERSET_BASE_URL,
      adminId: SUPERSET_EMBED_ADMIN_ID
    },
    tokenWhitelistedDomains: [
      BASE_URL_API,
    ],
    tokenBlacklistedRoutes: [
      '/api/token',
      '/api/user',
    ]
  }

  fs.writeFileSync(
    path.join("src/environments", "environment.prod.ts"),
    `export const environment = ${JSON.stringify(environmentVariables, null, 2)};`
  );
  console.log(`Vairaveis de ambiente criadas com sucesso!`);
} catch (error) {
  console.error("Erro ao atualizar variaveis de ambiente:", error);
  process.exit(1);
}