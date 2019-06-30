<script context="module">
  import { requestApi } from "../../helpers/apiClient.js";
  import graphql from "../../helpers/graphql.js";

  export async function preload({ params, query }) {
    const productQuery = graphql`
      @graphql
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
      @graphql
    `;

    const variables = {
      id: params.slug
    };

    const apiData = await requestApi(productQuery(variables));

    if (apiData.errors)
      this.error(400, `Could Not Find A Product Named: ${params.slug}`);

    return { product: apiData.data.product };
  }
</script>

<script>
  import Image from "../../components/Product/Image.svelte";
  import BuyButton from "../../shopkit/components/BuyButton.svelte";

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

      <BuyButton productId={product.id} />

    </div>
  {/if}
</section>
