<script context="module">
  import { requestApi } from "../../helpers/apiClient.js";
  import graphql from "../../helpers/graphql.js";

  export async function preload({ params, query }) {
    const productsQuery = graphql`
      @graphql
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
      @graphql
    `;

    const apiData = await requestApi(productsQuery());

    if (apiData.errors) this.error(500, errors[0].message);

    return { products: apiData.data.products };
  }
</script>

<script>
  import Image from "../../components/Product/Image.svelte";
  import BuyButton from "../../shopkit/components/BuyButton.svelte";

  export let products;
</script>

<style>
  section {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3rem 1rem;
  }

  @media (max-width: 50rem) {
    section {
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 30rem) {
    section {
      grid-template-rows: repeat(1, 1fr);
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .product {
    text-align: center;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15);
    padding: 0.4rem;
  }

  a {
    text-decoration: none;
    display: block;
    width: 100%;
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
          <Image {product} size={250} />
          <p>{product.name}</p>
        </a>

        <BuyButton productId={product.id} />

      </div>
    {/each}
  {/if}
</section>
