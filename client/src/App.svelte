<script>
  import logo from './assets/svelte.png'
  import router from 'page';

  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Header from "./components/Header.svelte";
  import Register from "./pages/Register.svelte";
  import Login from "./pages/Login.svelte";
  import TestAdminPage from "./pages/TestAdminPage.svelte";
  import {isLoggedIn} from "./middleware/isLoggedIn.js";
  import {isAdmin} from "./middleware/isAdmin.js";
  import {isNotLoggedIn} from "./middleware/isNotLoggedIn.js";

  let page;
  let params;
  let currentRoute;

  router('/', (ctx) => {
    page = Home;
    currentRoute = ctx.pathname;
  });

  router('/about', isLoggedIn, (ctx) => {
    page = About;
    currentRoute = ctx.pathname;
    params = ctx;
  });

  router('/register', isNotLoggedIn, (ctx) => {
    page = Register;
    currentRoute = ctx.pathname;
    params = ctx;
  });

  router('/login',isNotLoggedIn, (ctx) => {
    page = Login;
    currentRoute = ctx.pathname;
    params = ctx;
  });

  router('/protected', isLoggedIn, isAdmin, (ctx) => {
    page = TestAdminPage;
    currentRoute = ctx.pathname;
    params = ctx;
  });

  router.start();
</script>

<main>
  <Header active={currentRoute} />
  <svelte:component this={page} {params} />
</main>

<style global lang="postcss">
  @import './global.css';
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
