<script>
  import { connect } from "../model";

  import Button from "./Button.svelte";

  export let text = "Add to Cart";
  export let type = null;
  export let openCart = false;
  export let productId = null;
  export let productSku = null;
  export let productName = null;
  export let productPrice = null;

  const cart = connect("cart");
  const modal = connect("modal");

  function addItem() {
    type !== "custom"
      ? cart.dispatch("addItem", { id: productId })
      : cart.dispatch("addItem", {
          type: "custom_item",
          name: productName,
          sku: productSku,
          price: {
            amount: parseInt(productPrice, 10)
          }
        });

    openCart && modal.dispatch("openCart");
  }
</script>

<Button buttonType="primary" className="shopkit-buy-button" on:click={addItem}>
   {text}
</Button>
