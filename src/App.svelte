<script lang="ts">
  import { onMount } from 'svelte'

  enum UIState {
    Initial,
    Loading,
    Done,
    Error,
  }

  let uiState: UIState = UIState.Initial

  let restaurant = undefined

  onMount(async () => {
    try {
      uiState = UIState.Loading

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
        `http://localhost:8080/api/turku/restaurant?timeZoneOffsetInMinutes=${timeZoneOffsetInMinutes}`
      )
      restaurant = await response.json()
      console.info(`Got restaurant recommendation: ${restaurant.name}`)

      uiState = UIState.Done
    } catch (error) {
      console.error(error)

      uiState = UIState.Error
    }
  })
</script>

<main class="container">
  {#if uiState === UIState.Done}
    <p class="restaurant">{restaurant.name}</p>
  {:else if uiState === UIState.Error}
    <p>Error occurred while loading data.</p>
  {/if}
</main>

<style>
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 24px;
    background: linear-gradient(to right, #ff9a9e, #fad0c4);
    color: #fff;
    font-family: Rubik, sans-serif;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .restaurant {
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
