## Plan: Refactor Store Architecture with Namespaced Actions

Restructure the store implementation to support multiple sub-stores with namespaced actions, enabling scalable state management as the application grows. This moves from a flat global state to a composable store architecture with domain-specific namespaces using action creator functions for better encapsulation. The root store handles all notifications after collecting updates from sub-stores.

### Steps

1. **Create `apps/web/src/shared/stores/taskStore.ts`** that exports `createTaskStore(updateRoot: () => void)` function; implement action creator functions (`add(text)`, `delete(id)`, `edit(id, text)`, `toggleCompleted(id, completed)`, `setFilter(filter)`) that dispatch namespaced actions (`TASKS:ADD`, `TASKS:DELETE`, etc.); implement `mutate(action: TaskAction)` function with switch statement for handling mutations; call `updateRoot()` callback after each successful mutation to trigger root store notification; manage local `TaskState` and expose `getState()` method.

2. **Update `apps/web/src/shared/types.ts`** to rename `State` → `TaskState`; create `TaskAction` discriminated union with namespaced types (`TASKS:ADD`, `TASKS:DELETE`, `TASKS:EDIT`, `TASKS:COMPLETED`, `TASKS:FILTER`); create `RootState = { tasks: TaskState }` type; create `RootAction = TaskAction` union (expandable for future stores); update `GlobalEventHandlersEventMap` to use `RootState` and `RootAction`.

3. **Create `apps/web/src/shared/stores/rootStore.ts`** that exports `createRootStore(el: HTMLElement)` as main factory; initialize task sub-store with `updateRoot` callback that calls `notify()`; expose task store via `tasks` property containing action creators; implement single `EVENT_ACTION` listener that routes to `taskStore.mutate()` based on `TASKS:` prefix; implement `notify()` that merges all sub-store states into `RootState` and dispatches single `EVENT_DATA`; expose `getState()` returning complete `RootState`; return `{ tasks: taskStore, getState }` object.

4. **Update `apps/web/src/shared/constants.ts`** to add `TASKS_NS = "TASKS:"` constant for namespace prefix; keep existing `EVENT_ACTION`, `EVENT_DATA`, `EVENT_LOAD` constants unchanged.

5. **Update `apps/web/src/shared/store.ts`** to import `createRootStore` from `./stores/rootStore.ts`; re-export as `Store` for backward compatibility; remove old `mutateState` function and local state management; remove old `action` and `dispatchEvent` helpers (replaced by action creators); update file to be minimal facade/re-export layer.

6. **Update `apps/web/src/shared/mixins/with-store.ts`** to type `protected store` as return type of `createRootStore` (RootStore type); update context provider initial value type; ensure type safety for components accessing `this.store.tasks.add()` etc.

7. **Create `apps/web/src/shared/mixins/store-context.ts`** type definition for RootStore if not already properly typed; ensure context provides full store shape with sub-store properties.

8. **Update `apps/web/src/main-app.ts`** to use `RootState` type; access task state via `this.state.tasks`; update `EVENT_DATA` listener to type `CustomEvent<RootState>`; pass `this.state.tasks` to Tasks route component; update `getState()` call to return `RootState`.

9. **Update `apps/web/src/routes/tasks/components/task-item.ts`** to call action creators: `this.store?.tasks.delete(id)`, `this.store?.tasks.toggleCompleted(id, completed)`, `this.store?.tasks.edit(id, text)`; remove `dispatchEvent` import and usage; update type imports to `TaskState`, `TaskAction`.

10. **Update `apps/web/src/routes/tasks/tasks-page.ts`** to call `this.store?.tasks.add(text)` using action creator; update prop type from `State` to `TaskState`; remove old dispatchEvent patterns.

11. **Update `apps/web/src/routes/tasks/components/todo-list.ts`** to use `RootState` in `EVENT_DATA` listener; extract items from `event.detail.tasks.items`; update property and method types.

12. **Update `apps/web/src/routes/Tasks.ts`** functional component to accept `TaskState` parameter instead of `State`; pass to child components correctly.

13. **Add missing query functions** to `apps/web/src/shared/queries.ts`: implement `updateTask(id: number, text: string)` and `toggleTaskCompletion(id: number, completed: 0 | 1)` using Kysely update operations.

14. **Complete mutation implementations** in `stores/taskStore.ts` for `TASKS:EDIT` and `TASKS:COMPLETED` cases by calling new query functions; ensure all mutations properly await database operations before calling `updateRoot()`.
