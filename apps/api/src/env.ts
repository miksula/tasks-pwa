import { z } from "zod";
import process from "node:process";

const envObject = Deno.env.toObject();

const EnvSchema = z
  .object({
    ENV: z.string().default("development"),
    PORT: z.coerce.number().default(9999),
    LOG_LEVEL: z.enum([
      "fatal",
      "error",
      "warn",
      "info",
      "debug",
      "trace",
      "silent",
    ]),
    DATABASE_URL: z.url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  })
  .superRefine((input, ctx) => {
    if (input.ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
      ctx.addIssue({
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["DATABASE_AUTH_TOKEN"],
        message: "Must be set when ENV is 'production'",
      });
    }
  });

export type env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line ts/no-redeclare
const { data: env, error } = EnvSchema.safeParse(envObject);

if (env?.ENV == "development") {
  console.log("Loaded env:", env);
}

if (error) {
  console.error("❌ Invalid env:");
  console.error(z.treeifyError(error));
  process.exit(1);
}

export default env!;
