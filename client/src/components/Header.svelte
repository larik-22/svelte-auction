<script>
    import {get} from "svelte/store";
    import {authToken} from "../stores/auth.js";
    import {isUserAdmin} from "../utils/auth.js";

    export let active;
    $: loggedIn = $authToken !== null;
    $: isAdmin = loggedIn && isUserAdmin();
</script>

<nav class="container flex justify-between gap-4 py-4">
    <h2>Logo goes here</h2>
    <ul class="flex items-center gap-4">
        <li><a class:active={active === "/"} href="/">Home</a></li>
        <li><a class:active={active === "/about"} href="/about">About</a></li>
        {#if !loggedIn}
            <li>
                <a class:active={active === "/register"} href="/register">Sign up</a>
                <a class:active={active === "/login"} href="/login">Sign in</a>
            </li>

        {/if}
        {#if isAdmin}
            <li><a class:active={active === "/admin"} href="/admin">Admin</a></li>
        {/if}
    </ul>
</nav>

<style>
    .active {
        @apply text-blue-500;
    }
</style>