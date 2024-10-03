<script>
    import {authToken} from "../stores/auth.js";
    import {isUserAdmin} from "../utils/auth.js";
    import Button from "./Button.svelte";

    export let active;
    $: loggedIn = $authToken !== null;
    $: isAdmin = loggedIn && isUserAdmin();
</script>

<nav class="container-base flex justify-between items-center align-middle gap-4 py-4 border-b sticky top-0 z-50 bg-white">
    <a href="/" class="text-2xl font-bold">StickNation</a>
    <div class="flex gap-8 items-center">
        {#if loggedIn}
            {#if isAdmin}
                <a href="/dashboard" class:active={active === '/dashboard'}>
                    <Button>Dashboard</Button>
                </a>
                {:else}
                <a href="/account" class="border-blue-600" class:active={active === '/account'}>
                    <Button>Account</Button>
                </a>
            {/if}
        {:else}
            <div class="flex items-center gap-2">
                <a href="/login" class:active={active === '/login'}>
                    <Button variant="secondary">Login</Button>
                </a>
                <a href="/register" class:active={active === '/register'}>
                    <Button>Register</Button>
                </a>
            </div>
        {/if}
    </div>
</nav>

<style>
    .active {
        @apply font-medium;
    }
</style>