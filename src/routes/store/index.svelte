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
    return {
      products: apiData.data.products,
      errors: apiData.errors
    };
  }
</script>

<script>
  import Image from "../../components/Product/Image.svelte";

  export let products, errors;

  $: if (errors) errors.forEach(error => console.error(error.message));
</script>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
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

<svelte:head>
  <title>Store</title>
</svelte:head>

<section>
  {#if products}
    {#each products as product (product.id)}
      <div class="product">
        <a href="store/{product.id}" rel="prefetch">
          <p>{product.name}</p>
          <Image size={200} {product} />
        </a>
      </div>
    {/each}
  {/if}
</section>
