<script context="module">
  import { requestApi } from "../../helpers/apiClient.js";
  import graphql from "../../helpers/graphql.js";

  export async function preload({ params, query }) {
    const productsQuery = graphql`
      query {
        products {
          id
          name
          slug
          main_image {
            href
          }
        }
      }
    `;

    const apiData = await requestApi(productsQuery());
    return { products: apiData.data.products };
  }
</script>

<script>
  import { fade } from "svelte/transition";

  import { productImageUrl } from "./_utils.js";

  export let products;
</script>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    display: block;
    max-height: 200px;
    margin: 0 auto;
  }

  .product {
    transition: all 3s;
    border: 1px solid black;
    margin: 0.4rem;
    padding: 0.4rem;
  }

  a {
    text-decoration: none;
    display: inline-block;
  }
</style>

<section>
  {#if products}
    {#each products as product (product.id)}
      <div class="product" in:fade={{ delay: 100, duration: 100 }}>
        <a href="store/{product.id}" rel="prefetch">
          <img
            src={productImageUrl(product.main_image.href)}
            alt={product.name} />
          <p>{product.name}</p>
        </a>
      </div>
    {/each}
  {/if}
</section>
