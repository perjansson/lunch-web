<script lang="ts">
  import { Router, Route } from 'svelte-routing'

  import Background from './components/Background.svelte'
  import Menu from './components/Menu.svelte'
  import Location from './routes/Location.svelte'
  import { onMount } from 'svelte'

  let initialRoute = getRoute()
  let showMenu = initialRoute === '' // Show menu if no location is selected

  function getRoute() {
    var url = window.location.href
    var segments = url.split('/')
    return segments[segments.length - 1] ?? '/'
  }

  onMount(() => {
    window.addEventListener('popstate', function (event) {
      showMenu = getRoute() === ''
    })
  })

  console.info(
    `App component initialized with url: ${initialRoute} from url: ${window.location.href}`
  )
</script>

<Router url={initialRoute}>
  <Background>
    <Menu isOpen={showMenu} onClose={() => (showMenu = false)} />
    <button class="menu-button" on:click={() => (showMenu = !showMenu)}>
      <img
        src={showMenu ? '/menu-close.png' : '/menu-open.png'}
        alt={`${showMenu} ? 'Close' : 'Open' menu`}
      />
    </button>
    <div class="container">
      <div class="content">
        <Route path="/:locationId" let:params>
          <Location locationId={params.locationId} />
        </Route>
      </div>
    </div>
  </Background>
</Router>

<style>
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    max-width: 95%;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
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
