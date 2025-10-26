import * as z from "zod";
import { sql } from "kysely";
import { db } from "../client.ts";

const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

type Task = z.infer<typeof taskSchema>;

const results = await sql<Task[]>`select * from task`.execute(db);

console.log("Tasks:", results);
