<script>
  import { onMount } from "svelte";
  import { transformImageUrl } from "../../helpers/utils.js";

  import Loading from "./Loading.svelte";

  export let product,
    size = null;

  let showError = false;
  let error = "Could Not Load Image";
</script>

<style>
  img {
    display: block;
    opacity: 0;

    width: 100%;
    height: auto;
  }
</style>

<div style="min-height: {size ? size : 0}px">
  {#await transformImageUrl(product.main_image.href, size)}
    <p>Loading Image</p>
  {:then imageUrl}
    <img
      on:load={() => this.classList.add('visible')}
      on:error={() => (showError = true)}
      src={imageUrl}
      alt={product.name} />
  {:catch}
    <p>{error}</p>
  {/await}

  {#if showError}
    <p>{error}</p>
  {/if}
</div>
