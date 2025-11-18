import { EVENT_ACTION } from "./constants.ts";
import { Action } from "./types.ts";

function dispatchActionEvent(
  detail: Action,
  bubbles = true,
  composed = true,
) {
  globalThis.dispatchEvent(
    new CustomEvent<Action>(EVENT_ACTION, {
      detail,
      bubbles,
      composed,
    }),
  );
}

/**
 * @action Decorator applied to async Store class methods to dispatch
 * action event.
 *
 * @example
 * ```ts
 * import action from "@/shared/action.ts";
 *
 * class TaskStore {
 *  `@action`
 *   async completeTask(id: string) {
 *     // update state and trigger EVENT_ACTION afterwards
 *   }
 * }
 * ```
 */
export default function action<This, Args extends unknown[], Return>(
  value: (this: This, ...args: Args) => Promise<Return>,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Promise<Return>
  >,
) {
  if (context.kind == "method") {
    return async function (this: This, ...args: Args): Promise<Return> {
      const result = await value.apply(this, args);
      dispatchActionEvent({ name: "tasks:" + String(context.name) });
      return result;
    };
  }
}
