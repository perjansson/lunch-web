<script lang="ts">
  import { fade, scale } from 'svelte/transition'
  import Loading from './Loading.svelte'
  import { backendUrl } from '../constants'

  enum UIState {
    Loading,
    Done,
    Error,
  }

  export let locationId: string
  let uiState: UIState = UIState.Loading
  let restaurant = undefined

  $: {
    fetchRestaurant(locationId)
  }

  async function fetchRestaurant(locationId: string) {
    try {
      uiState = UIState.Loading
      restaurant = undefined

      const date = new Date()
      const isoDate =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        date.getDate().toString().padStart(2, '0')

      console.info(
        `Getting restaurant recommendation of the day for ${locationId} at ${isoDate}.`
      )

      const response = await fetch(
        `${backendUrl}/api/${locationId}/restaurant?isoDate=${isoDate}`
      )

      if (response.ok) {
        restaurant = await response.json()
        console.info(
          `Got restaurant recommendation of the day for ${locationId} at ${isoDate}: ${restaurant.name}.`
        )
        uiState = UIState.Done
      } else {
        console.error(
          `Error getting restaurant recommendation: ${response.status} ${response.statusText}`
        )
        uiState = UIState.Error
      }
    } catch (error) {
      console.error(`Error getting restaurant recommendation: ${error}`)
      uiState = UIState.Error
    }
  }
</script>

<main>
  {#if uiState === UIState.Loading}
    <Loading />
  {:else if uiState === UIState.Done}
    <div class="restaurant">
      {#each restaurant.name.split('') as char, i (char + i)}
        <span
          in:scale={{ delay: 30 * i, duration: 250 }}
          out:fade={{ duration: 300 }}
          class="char">{@html char === ' ' ? '&nbsp;' : char}</span
        >
      {/each}
    </div>
  {:else if uiState === UIState.Error}
    <p>
      Error occurred while loading data, check browser logs for more details.
    </p>
  {/if}
</main>

<style>
  main {
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .restaurant {
    height: 160px;
    font-size: 120px;
    font-family: Rubik, sans-serif;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transition: font-size 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    .restaurant {
      font-size: 48px;
    }
  }

  @media (max-width: 480px) {
    .restaurant {
      font-size: 32px;
    }
  }

  .char {
    display: inline-block;
    perspective: 1000px;
  }
</style>
