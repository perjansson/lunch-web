<script>
  import { afterUpdate } from 'svelte'
  import { fade } from 'svelte/transition'

  let showLoading = false

  afterUpdate(() => {
    setTimeout(() => {
      showLoading = true
    }, 500)
  })
</script>

{#if showLoading}
  <img
    in:fade={{ duration: 500 }}
    src="/broccoli.webp"
    alt="Loading..."
    width="160"
    height="160"
  />
{/if}
