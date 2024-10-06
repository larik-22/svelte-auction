<script>
    import router from 'page';

    import Header from "./components/Header.svelte";
    import Register from "./pages/Register.svelte";
    import Login from "./pages/Login.svelte";
    import Dashboard from "./pages/Dashboard.svelte";
    import HomeProper from "./pages/Home.svelte";
    import AuctionPage from "./pages/AuctionPage.svelte";
    import Account from "./pages/Account.svelte";
    import {isLoggedIn} from "./middleware/isLoggedIn.js";
    import {isAdmin} from "./middleware/isAdmin.js";
    import {isNotLoggedIn} from "./middleware/isNotLoggedIn.js";
    import {isNotAdmin} from "./middleware/isNotAdmin.js";

    let page;
    let params;
    let currentRoute;

    router('/', (ctx) => {
        page = HomeProper;
        currentRoute = ctx.pathname;
        params = ctx;
    });

    router("/stick/:id", (ctx) => {
        page = AuctionPage;
        currentRoute = ctx.pathname;
        params = ctx;
    });

    router('/register', isNotLoggedIn, (ctx) => {
        page = Register;
        currentRoute = ctx.pathname;
        params = ctx;
    });

    router('/login', isNotLoggedIn, (ctx) => {
        page = Login;
        currentRoute = ctx.pathname;
        params = ctx;
    });

    router('/dashboard', isLoggedIn, isAdmin, (ctx) => {
        page = Dashboard;
        currentRoute = ctx.pathname;
        params = ctx;
    });

    router('/account', isLoggedIn, isNotAdmin, (ctx) => {
        page = Account;
        currentRoute = ctx.pathname;
        params = ctx;
    })

    router.start();
</script>

<main>
    <Header active={currentRoute}/>
    <svelte:component this={page} {params}/>
</main>

<style global lang="postcss">
    @import './global.css';

    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
