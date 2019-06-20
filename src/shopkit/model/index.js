import persistState from "@storeon/localstorage";
import { createSvelteStore } from "@storeon/svelte";

import cart from "./cart.js";
import modal from "./modal.js";
import checkout from "./checkout.js";

export const connect = createSvelteStore([
  cart,
  modal,
  checkout,

  persistState(["cart"], {
    key: "mcart"
  })
]);
