import { notaService as service } from "./services/notaService.js";
import { retry, timeoutPromise } from "./utils/promise-helpers.js";
import "./utils/array-helpers.js";
import { debounceTime, partialize, pipe, takeUntil } from "./utils/operations.js";
import { EventEmitter } from "./utils/event-emitter.js";

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
);

const action = operations(() =>
  retry(3, 3000, () => timeoutPromise(200, service.sumItems('2143')))
  .then((total) => EventEmitter.emit("totalOfItems", total))
  .catch(console.log)
);

document
  .querySelector("#myButton")
  .onclick = action;