<script lang="ts">
  import Restaurant from '../components/Restaurant.svelte'
  import { locations } from '../constants'

  export let locationId: string
  $: location = locations.find((location) => location.id === locationId)
  $: console.info(`Location component initialized with id: ${location.id}`)

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const currentDate = new Date().toLocaleDateString(undefined, options)
</script>

<h1 class="location">{location.label}</h1>
<p>{currentDate}</p>
<Restaurant {location} />

<style>
  .location {
    font-size: 42px;
    transition: all 0.3s ease-in-out;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    .location {
      font-size: 48px;
    }
  }

  @media (max-width: 480px) {
    .location {
      font-size: 24px;
    }
  }
</style>
