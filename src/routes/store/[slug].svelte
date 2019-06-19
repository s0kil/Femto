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
  import Image from "../../components/Product/Image.svelte";
  export let product;
</script>

<style>
  .product {
    text-align: center;
  }

  .image {
    margin: 0 auto;
    max-width: 600px;
  }
</style>

<section>
  {#if product}
    <div class="product">
      <div class="image">
        <Image size={600} {product} />
      </div>
      <h1>{product.name}</h1>
    </div>
  {/if}
</section>
