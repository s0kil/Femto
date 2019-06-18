<script context="module">
  import { requestApi } from "../../helpers/apiClient.js";
  import graphql from "../../helpers/graphql.js";

  export async function preload({ params, query }) {
    const productQuery = graphql`
      query($id: ID!) {
        product(id: $id) {
          id
          name
          slug
          main_image {
            href
          }
        }
      }
    `;

    const variables = {
      id: params.slug
    };

    const apiData = await requestApi(productQuery(variables));
    return { product: apiData.data.product };
  }
</script>

<script>
  import { fade } from "svelte/transition";
  import { productImageUrl } from "./_utils.js";

  export let product;
</script>

<style>
  img {
    max-height: 300px;
  }
</style>

<section>
  {#if product}
    <div class="product" in:fade={{ delay: 100, duration: 100 }}>
      <img src={productImageUrl(product.main_image.href)} alt={product.name} />
      <p>{product.name}</p>
    </div>
  {/if}
</section>
