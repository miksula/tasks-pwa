type RouterOptions = {
  root?: string;
};

type RouteHandler = (...args: RegExpMatchArray) => void;

type RouteItem = {
  re: RegExp;
  handler: RouteHandler;
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
      // Handle back/forward navigation
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

  add(re: RegExp | RouteHandler, handler?: RouteHandler) {
    if (typeof re === "function") {
      handler = re as RouteHandler;
      re = /^.*$/; // Default catch-all pattern
    }
    const h = handler as RouteHandler;
    this.routes.push({ re: re as RegExp, handler: h });
    return this;
  }

  check(f?: string) {
    const fragment = f || this.getPath();
    for (let i = 0; i < this.routes.length; i++) {
      const match = fragment.match(this.routes[i].re);
      if (match) {
        const result = this.routes[i].handler.apply({}, match);
        // Trigger callback after route change
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
    // Trigger route check after navigation
    this.check();
    return this;
  }
}
