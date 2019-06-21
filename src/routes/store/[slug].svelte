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
    return { product: apiData.data.product };
  }
</script>

<script>
  import Loadable from "svelte-loadable/Loadable.svelte";
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
        <Image {product} />
      </div>

      <h1>{product.name}</h1>

      <Loadable
        loader={() => import('../../shopkit/components/BuyButton.svelte')}>
        <div slot="success" let:component>
          <svelte:component this={component} productId={product.id} />
        </div>
      </Loadable>

    </div>
  {/if}
</section>
