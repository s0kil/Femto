<script>
  import { onMount } from "svelte";
  import { transformImageUrl } from "../../helpers/utils.js";

  export let product,
    size = null;
</script>

<style>
  img {
    display: block;
    opacity: 0;

    width: 100%;
    height: auto;
  }
</style>

<img
  on:load={() => this.classList.add('visible')}
  src={transformImageUrl(product.main_image.href, size)}
  alt={product.name} />
