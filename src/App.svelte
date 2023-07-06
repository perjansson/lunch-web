<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import { onMount } from 'svelte'
  import Background from './components/Background.svelte'
  import Menu from './components/Menu.svelte'
  import Location from './routes/Location.svelte'

  let currentRoute = getRoute()
  let initialRoute = currentRoute
  let showMenuButton = currentRoute !== ''

  $: showMenu = initialRoute === '' // Show menu if no location is selected
  $: {
    if (currentRoute === '/') {
      showMenu = true
    }
  }

  function getRoute() {
    var url = window.location.href
    var segments = url.split('/')
    return segments[segments.length - 1] ?? '/'
  }

  onMount(() => {
    // This is to handle browser back/forward navigation
    window.addEventListener('popstate', function () {
      currentRoute = getRoute()
      showMenu = currentRoute === ''
      showMenuButton = currentRoute !== ''
    })
  })

  console.info(
    `App component initialized with url: ${initialRoute} from url: ${window.location.href}`
  )
</script>

<Router url={initialRoute}>
  <Background>
    <Menu
      isOpen={showMenu}
      onMenuItemSelected={(locationId) => {
        showMenu = false
        showMenuButton = locationId !== ''
      }}
    />
    {#if showMenuButton}
      <button class="menu-button" on:click={() => (showMenu = !showMenu)}>
        <img
          src={showMenu ? '/menu-close.png' : '/menu-open.png'}
          alt={`${showMenu} ? 'Close' : 'Open' menu`}
        />
      </button>
    {/if}
    <main class="container">
      <div class="content">
        <Route path="/:locationId" let:params>
          <Location locationId={params.locationId} />
        </Route>
      </div>
    </main>
  </Background>
</Router>

<style>
  .container {
    display: flex;
    flex-direction: column;
    max-width: 90%;
    width: 90%;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .menu-button {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-button img {
    width: 40px;
    height: 40px;
  }
</style>
