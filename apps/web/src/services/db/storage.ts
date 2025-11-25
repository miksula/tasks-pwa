/**
 * @module Async localStorage wrapper.
 */
import type { Filter } from "../types.ts";

export async function getFilter(): Promise<Filter> {
  const result = await Promise.resolve(localStorage.getItem("tasks.filter")) as
    | Filter
    | null;
  return result || "all";
}

export async function setFilter(filter: Filter): Promise<void> {
  localStorage.setItem("tasks.filter", filter);
  return await Promise.resolve();
}
