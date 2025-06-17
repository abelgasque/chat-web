require('dotenv').config();
require('./build-packege');

const fs = require('fs');
const path = require('path');

try {
  const baseUrlApi = process.env.BASE_URL_API;
  const environmentVariables = {
    production: true,
    name: process.env.APP_NAME,
    description: process.env.APP_DESCRIPTION,
    version: process.env.APP_VERSION,
    baseUrlApi: baseUrlApi,
    tokenWhitelistedDomains: [
      baseUrlApi,
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