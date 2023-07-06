<script lang="ts">
  import Restaurant from '../components/Restaurant.svelte'
  import { locations } from '../constants'

  export let locationId: string
  $: location = locations.find((location) => location.id === locationId)
  $: console.info(`Location component initialized with id: ${location.id}`)
</script>

<h1 class="location">{location.label}</h1>

<Restaurant {location} />

<style>
  .location {
    font-size: 42px;
    transition: all 0.3s ease-in-out;
    text-decoration: underline;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    .location {
      font-size: 32px;
    }
  }

  @media (max-width: 480px) {
    .location {
      font-size: 18px;
    }
  }
</style>
