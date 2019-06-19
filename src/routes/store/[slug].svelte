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

<section>
  {#if product}
    <div class="product">
      <Image {product} />
      <p>{product.name}</p>
    </div>
  {/if}
</section>
