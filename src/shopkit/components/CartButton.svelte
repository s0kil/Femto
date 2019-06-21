<script>
  import { connect } from "../model";
  import { pluralize } from "../helpers/utils.js";

  import Button from "./Button.svelte";

  export let text = "Cart";
  export let showTotal = false;

  const cart = connect("cart");
  const modal = connect("modal");

  $: subTotal = $cart.subTotal;
  $: count = $cart.count;

  $: buttonSuffix =
    subTotal || count
      ? ` (${showTotal ? subTotal : pluralize(count, "item")})`
      : null;
</script>

<Button
  className="shopkit-cart-button"
  buttonType="primary"
  on:click={() => modal.dispatch('openCart')}>
   {text}
  {#if buttonSuffix}{buttonSuffix}{/if}
</Button>
