import { hc } from "hono/client";
declare const client: {
    [x: string]: import("hono/client").ClientRequest<{
        [Method: `$${Lowercase<string>}`]: import("hono/types").Endpoint;
    }>;
};
export type Client = typeof client;
declare const _default: (...args: Parameters<typeof hc>) => Client;
export default _default;
export type ErrorSchema = {
    error: {
        issues: {
            code: string;
            path: (string | number)[];
            message?: string | undefined;
        }[];
        name: string;
    };
    success: boolean;
};
//# sourceMappingURL=index.d.ts.map