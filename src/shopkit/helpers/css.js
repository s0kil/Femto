import { onMount } from "svelte";

const _css = properties => {
  onMount(() => {
    for (const property in properties) {
      document.documentElement.style.setProperty(
        `--${property}`,
        properties[property]
      );
    }
  });
};

export default _css;
