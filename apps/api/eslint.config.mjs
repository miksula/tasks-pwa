import createConfig from "@app/eslint-config/create-config";

export default createConfig({
  ignores: ["src/db/migrations/*"],
});
