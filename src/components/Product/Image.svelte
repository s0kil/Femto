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

{#await transformImageUrl(product.main_image.href, size)}
  <p>Loading Image</p>
{:then imageUrl}
  <img
    on:load={() => this.classList.add('visible')}
    src={imageUrl}
    alt={product.name} />
{:catch}
  <p>Could Not Load Image</p>
{/await}
