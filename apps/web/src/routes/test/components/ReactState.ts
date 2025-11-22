// deno-lint-ignore-file no-explicit-any
import { html } from "lit";
import { dispatchActionEvent } from "@/shared/action.ts";

let callIndex = -1;
const stateValues: any[] = [];

const useState = (initialValue: any) => {
  callIndex++;

  const currentCallIndex = Number(callIndex);

  if (stateValues[currentCallIndex] == undefined) {
    stateValues[currentCallIndex] = initialValue;
  }

  const setValue = (newValue: any) => {
    stateValues[currentCallIndex] = newValue;
    dispatchActionEvent({ name: "useState" });
    callIndex = -1;
  };

  return [stateValues[currentCallIndex], setValue];
};

export default function ReactState() {
  const [countA, setCountA] = useState(1);
  const [countB, setCountB] = useState(-1);

  console.log("countA", countA);

  return html`
    <section>
      <div>
        <h1>Count A: ${countA}</h1>
        <button @click="${() => setCountA(countA + 1)}">Increment A</button>
        <button @click="${() => setCountA(countA - 1)}">Decrement A</button>
      </div>
      <div>
        <h1>Count B: ${countB}</h1>
        <button @click="${() => setCountB(countB + 1)}">Increment B</button>
        <button @click="${() => setCountB(countB - 1)}">Decrement B</button>
      </div>
    </section>
  `;
}
