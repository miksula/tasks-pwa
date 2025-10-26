/*
import * as z from "zod";
import type { Generated } from "kysely";

export const PersonSchema = z.object({
  id: z.custom<Generated<number>>(autoIncrement),
  name: z.string(),
  gender: z.enum(["M", "F", "N"]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

const positiveInteger = z.number().int().positive();

function autoIncrement(val: unknown) {
  return positiveInteger.safeParse(val).success;
}
export type PersonTable = z.infer<typeof PersonSchema>;
*/
