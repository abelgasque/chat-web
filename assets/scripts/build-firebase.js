require('dotenv').config();

const fs = require('fs');
const path = require('path');

try {
  const databaseRules = {
    "rules": {
      ".read": false,
      ".write": false
    }
  }

  const config = {
    database: {
      rules: "database.rules.json"
    },
    hosting: {
      public: "dist",
      ignore: [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ],
      rewrites: [
        {
          source: "**",
          destination: "/index.html"
        }
      ]
    }
  }

  fs.writeFileSync(
    path.resolve(__dirname, '../../../database.rules.json'),
    JSON.stringify(databaseRules, null, 2)
  );
  
  fs.writeFileSync(
    path.resolve(__dirname, '../../../firebase.json'),
    JSON.stringify(config, null, 2)
  );

  console.log(`Configurações firebase criadas com sucesso!`);
} catch (error) {
  console.error("Erro ao atualizar variaveis de ambiente:", error);
  process.exit(1);
}