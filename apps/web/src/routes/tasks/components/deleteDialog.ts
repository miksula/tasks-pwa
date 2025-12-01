import { html } from "lit";
import "@tailwindplus/elements";

export function DeleteDialog(
  open: boolean | undefined,
  onClickDelete: () => void,
  onClose: () => void,
) {
  return html`
    <el-dialog ?open="${open}" @close="${() => onClose()}">
      <dialog
        id="dialog"
        aria-labelledby="dialog-title"
        class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
      >
        <el-dialog-backdrop
          class="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"
        ></el-dialog-backdrop>

        <div
          tabindex="0"
          class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0"
        >
          <el-dialog-panel
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-100 sm:mx-0 sm:size-10 dark:bg-brand-500/10"
                >
                  <svg
                    viewBox="0 -960 960 960"
                    class="size-6 text-brand-600 dark:text-brand-400"
                    fill="currentColor"
                  >
                    <path
                      d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"
                    />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    id="dialog-title"
                    class="text-base font-semibold text-gray-900 dark:text-white"
                  >
                    Delete task
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Are you sure you want to remove this task? This action cannot
                      be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700/25"
            >
              <button
                type="button"
                command="close"
                commandfor="dialog"
                class="inline-flex w-full uppercase justify-center rounded-md bg-brand-200 px-4 py-3 text-xs font-semibold text-brand-700 sm:ml-3 sm:w-auto dark:bg-brand-500 dark:shadow-none dark:hover:bg-brand-400"
                @click="${() => onClickDelete()}"
              >
                Delete
              </button>
              <button
                type="button"
                command="close"
                commandfor="dialog"
                class="mt-3 uppercase inline-flex w-full justify-center rounded-md bg-white px-4 py-3 text-xs font-semibold text-gray-900 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
              >
                Cancel
              </button>
            </div>
          </el-dialog-panel>
        </div>
      </dialog>
    </el-dialog>
  `;
}
