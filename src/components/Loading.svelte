<script>
  import { afterUpdate } from 'svelte'
  import { fade } from 'svelte/transition'

  let showLoading = false

  afterUpdate(() => {
    setTimeout(() => {
      showLoading = true
    }, 1000)
  })
</script>

{#if showLoading}
  <img
    in:fade={{ duration: 1000 }}
    src="/globe-optimize.gif"
    alt="Loading..."
    width="100"
    height="100"
  />
{/if}
