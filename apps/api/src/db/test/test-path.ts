import * as path from "node:path";

// const p = path.join(import.meta.dirname as string, "migrations/");

// console.log(p);

const __dirname = path.dirname(new URL(import.meta.url).pathname);
console.log(__dirname);
