<script lang="ts">
  import { onMount } from 'svelte'

  enum UIState {
    Loading,
    Done,
    Error,
  }

  export let location: string
  let uiState: UIState = UIState.Loading
  let restaurant = undefined

  onMount(async () => {
    try {
      const date = new Date()
      const isoDate =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        date.getDate().toString().padStart(2, '0')
      const timeZoneOffsetInMinutes = date.getTimezoneOffset()

      console.info(
        `Getting restaurant recommendation of the day. Current date: ${isoDate} with timezone offset: ${timeZoneOffsetInMinutes}`
      )

      const response = await fetch(
        `http://localhost:8080/api/${location}/restaurant?timeZoneOffsetInMinutes=${timeZoneOffsetInMinutes}`
      )

      if (response.ok) {
        restaurant = await response.json()
        console.info(`Got restaurant recommendation: ${restaurant.name}`)
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
  })
</script>

<main>
  {#if uiState === UIState.Done}
    <p class="restaurant">{restaurant.name}</p>
  {:else if uiState === UIState.Error}
    <p>
      Error occurred while loading data, check browser logs for more details.
    </p>
  {/if}
</main>

<style>
  .restaurant {
    height: 160px;
    font-size: 78px;
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
</style>
