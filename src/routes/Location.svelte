<script lang="ts">
  import Restaurant from '../components/Restaurant.svelte'
  import { locations } from '../constants'

  export let locationId: string
  $: location = locations.find((location) => location.id === locationId)
  $: console.info(`Location component initialized with id: ${location.id}`)
</script>

<h1>{location.label}</h1>

<Restaurant {location} />

<style>
  h1 {
    font-size: 42px;
    margin-bottom: 20px;
  }
</style>
