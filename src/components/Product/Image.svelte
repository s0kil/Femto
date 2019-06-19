<script>
  import { onMount } from "svelte";
  import { transformImageUrl } from "../../helpers/utils.js";

  export let product;
</script>

<style>
  img {
    display: block;
    max-height: 200px;
    opacity: 0;
  }
</style>

<img
  on:load={() => this.classList.add('visible')}
  src={transformImageUrl(product.main_image.href)}
  alt={product.name} />
