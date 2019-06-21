<script>
  import "../styles/Global.svelte";
  import "../shopkit/components/Theme.svelte";

  import onIdle from "on-idle";

  import Loadable from "svelte-loadable/Loadable.svelte";
  import Nav from "../components/Nav.svelte";

  export let segment;

  let idle = false;
  const waitIdle = onIdle(() => {
    idle = true;
    waitIdle();
  });
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  :global(.visible) {
    transition: opacity 100ms;
    opacity: 1 !important;
  }
</style>

<svelte:head>
  <link rel="dns-prefetch" href="https://api.moltin.com" />
  <link href="https://api.moltin.com" rel="preconnect" crossorigin />
</svelte:head>

<Nav {segment} />

<main>
  <slot />
</main>

{#if idle}
  <Loadable loader={() => import('../shopkit/components/Modal/Modal.svelte')}>
    <div slot="success" let:component>
      <svelte:component this={component} stripeKey={process.env.STRIPE_KEY} />
    </div>
  </Loadable>
{/if}
