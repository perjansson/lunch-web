<script lang="ts">
  import { fade, scale } from 'svelte/transition'
  import { fly } from 'svelte/transition'
  import Loading from './Loading.svelte'
  import { backendUrl, type Location } from '../constants'

  enum UIState {
    Loading,
    Done,
    NoRestaurants,
    Error,
  }

  export let location: Location
  let uiState: UIState = UIState.Loading
  let restaurant = undefined

  $: {
    fetchRestaurant(location.id)
  }

  async function fetchRestaurant(locationId: string) {
    try {
      restaurant = undefined
      uiState = UIState.Loading

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
      } else if (response.status === 404) {
        console.error(
          `Error getting restaurant recommendation: ${response.status} ${response.statusText}`
        )

        uiState = UIState.NoRestaurants
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

<div class="container">
  {#if uiState === UIState.Loading}
    <Loading />
  {:else if uiState === UIState.Done}
    <div class="restaurant">
      {#each restaurant.name.split('') as char, i (char + i)}
        {#if char === ' '}
          <br />
        {:else}
          <span in:fly={{ y: 100, delay: 15 * i, duration: 200 }} class="char">
            {@html char === ' ' ? '&nbsp;' : char}
          </span>
        {/if}
      {/each}
    </div>
    <div class="quote">
      {restaurant.quote}
      <div class="powered-by">Powered by OpenAI</div>
    </div>
  {:else if uiState === UIState.NoRestaurants}
    <p>
      No restaurants for {location.label} has been added yet. You can add them in
      <a
        href={`https://docs.google.com/spreadsheets/d/1cxojkskq9deUDuTWqa-XAIbE7Cnu41K3L1K83UkO7bk/edit#gid=${location.gid}`}
        target="_blank"
        rel="noopener noreferrer">this Google spreadsheet</a
      >.
    </p>
  {:else if uiState === UIState.Error}
    <p>
      Error occurred while loading data, check browser logs for more details.
    </p>
  {/if}
</div>

<style>
  .container {
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 40px;
  }

  .restaurant {
    font-size: 104px;
    font-family: Rubik, sans-serif;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transition: font-size 0.3s ease-in-out;
    overflow: hidden;
  }

  .quote {
    font-size: 20px;
    font-family: Rubik, sans-serif;
    text-align: center;
    max-width: 60%;
    margin: 0 auto;
  }

  .powered-by {
    font-size: 8px;
    color: #888;
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    .restaurant {
      font-size: 100px;
    }
    .quote {
      max-width: 80%;
    }
  }

  @media (max-width: 480px) {
    .restaurant {
      font-size: 84px;
    }
    .quote {
      max-width: 95%;
    }
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 767px) and (orientation: landscape) {
    .restaurant {
      font-size: 84px;
    }
    .quote {
      max-width: 60%;
    }
  }

  .char {
    display: inline-block;
    perspective: 1000px;
  }
</style>
