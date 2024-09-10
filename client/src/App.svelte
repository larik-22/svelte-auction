<script>
  import logo from './assets/svelte.png'
  import router from 'page';

  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Header from "./components/Header.svelte";

  let page;
  let params;
  let currentRoute;

  router('/', (ctx) => {
    page = Home;
    currentRoute = ctx.pathname;
  });
  router('/about', (ctx) => {
    page = About;
    currentRoute = ctx.pathname;
    params = ctx;
  });

  router.start();
</script>

<main>
  <img src={logo} alt="Svelte Logo" />
  <Header active={currentRoute} />
  <svelte:component this={page} {params} />
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
