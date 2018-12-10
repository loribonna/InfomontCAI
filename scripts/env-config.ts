const { writeFileSync } = require("fs");
const { resolve } = require("path");
require("dotenv").config();

const file = resolve(
    __dirname,
    "..",
    "src",
    "environments",
    `versions.ts`
);
const envConfigFile = `
export const versions = {
    production: false,
    BACKEND_AUTH: "${process.env.BACKEND_AUTH}"
};
`;

writeFileSync(file, envConfigFile, { encoding: "utf-8" });
console.log(`Output generated at ${file}`);
