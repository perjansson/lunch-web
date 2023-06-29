<script lang="ts">
  import { Router, Link, Route } from 'svelte-routing'

  import Turku from './routes/Turku.svelte'
  import NewYork from './routes/NewYork.svelte'
  import Tampere from './routes/Tampere.svelte'
  import Background from './components/Background.svelte'

  var url = window.location.href
  var segments = url.split('/')
  var location = segments[segments.length - 1] ?? '/'
  let route = location

  console.info(
    `App component initialized with location: ${location} from url: ${window.location.href}`
  )
</script>

<Router {route}>
  <Background>
    <div class="container">
      <div class="content">
        <Route path="/turku" component={Turku} />
        <Route path="/newyork" component={NewYork} />
        <Route path="/tampere" component={Tampere} />
      </div>

      <footer class="footer">
        <nav>
          <Link to="/turku">Turku</Link>
          <Link to="/newyork">New York</Link>
          <Link to="/tampere">Tampere</Link>
        </nav>
      </footer>
    </div>
  </Background>
</Router>

<style>
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
  }

  .footer {
    flex-shrink: 0;
  }
</style>
