import { createContext } from "@lit/context";
import Store from "../stores/store.ts";
export type StoreType = ReturnType<typeof Store>;
export const storeContext = createContext<StoreType>("store");
