import { MoltinClient } from "../services/moltin";

export let stripeKey;

export let moltinApi = new MoltinClient({
  fetch: fetchController,
  client_id: process.env.MOLTIN_CLIENT_ID
  // application: "moltin-btn"
  // ...(moltinCurrency && { moltinCurrency })
});

let controller, signal;
export function fetchController(uri, options) {
  if (moltinApi.debounce && controller !== undefined) controller.abort(); // Cancel The Previous Request
  if (AbortController) {
    controller = new AbortController();
    signal = controller.signal;
  }

  return fetch(uri, {
    signal,
    ...options
  });
}
