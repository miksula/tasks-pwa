/// <reference lib="dom" />

export class RouteContext {
  public params: Record<string, string>;
  public path: string;

  constructor(path: string, params: Record<string, string> = {}) {
    this.path = path;
    this.params = params;
  }

  param(key?: string): string | Record<string, string> {
    if (key) {
      return this.params[key];
    }
    return this.params;
  }
}

type RouterOptions = {
  root?: string;
};

type RouteHandler = (context: RouteContext) => void;

type RouteItem = {
  re: RegExp;
  handler: RouteHandler;
  paramNames: string[];
};

export default class Router {
  private routes: RouteItem[] = [];
  private root = "/";
  private routeChangeHandler?: () => void;

  constructor(options: RouterOptions = {}) {
    if (options.root) {
      this.root = this.clearSlashes(options.root);
    }
    globalThis.addEventListener("popstate", () => {
      this.check();
    });
  }

  clearSlashes(path: string) {
    return path.replace(/\/$/, "").replace(/^\//, "");
  }

  getPath() {
    let fragment = this.clearSlashes(
      decodeURI(location.pathname + location.search),
    );
    fragment = fragment.replace(/\?(.*)$/, "");
    fragment = this.root != "/" ? fragment.replace(this.root, "") : fragment;
    return this.clearSlashes(fragment);
  }

  get path() {
    return this.root + this.getPath();
  }

  add(path: string | RegExp | RouteHandler, handler?: RouteHandler) {
    let re: RegExp;
    const paramNames: string[] = [];

    if (typeof path === "function") {
      handler = path;
      re = /^.*$/;
    } else if (typeof path === "string") {
      const pattern = path
        .replace(/:\w+/g, (match) => {
          paramNames.push(match.substring(1));
          return "([^/]+)";
        })
        .replace(/\//g, "\\/");
      re = new RegExp(`^${pattern}$`);
    } else {
      re = path;
    }

    if (!handler) {
      throw new Error("Handler is required");
    }

    this.routes.push({ re, handler, paramNames });
    return this;
  }

  check(f?: string) {
    const fragment = f || this.getPath();
    for (const route of this.routes) {
      const match = fragment.match(route.re);
      if (match) {
        const params: Record<string, string> = {};
        if (route.paramNames.length > 0) {
          for (let i = 0; i < route.paramNames.length; i++) {
            params[route.paramNames[i]] = match[i + 1];
          }
        }
        const context = new RouteContext(fragment, params);
        const result = route.handler.apply({}, [context]);
        if (this.routeChangeHandler) {
          this.routeChangeHandler();
        }
        return result;
      }
    }
    return null;
  }

  onRouteChange(callback: () => void) {
    this.routeChangeHandler = callback;
    return this;
  }

  navigate(path: string = "") {
    const page = this.root + this.clearSlashes(path);
    history.pushState({ route: page }, "", page);
    this.check();
    return this;
  }
}
