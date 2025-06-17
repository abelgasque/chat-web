const fs = require('fs');
const path = require('path');


try {
  const packageJsonPath = path.resolve(__dirname, '../../../package.json');
  const packageJson = require(packageJsonPath);
  
  Object.assign(packageJson, {
    name: process.env.APP_NAME || packageJson.name,
    version: process.env.APP_VERSION || packageJson.version,
  });
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log("Versão atualizada no package.json com sucesso!");
} catch (error) {
  console.error("Erro ao atualizar package.json:", error);
  process.exit(1);
}